/* eslint-disable no-useless-escape */
import React, { useEffect, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { getProvider } from '@models/wallet';
import { BasicLayout } from '@layouts';
import { NativeTokens, nativeTokens, ParaswapToken } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { globalExchangeState } from '@stores/ExchangeStore';
import { aaveMarketTokenToParaswapToken, depositTransaction } from '@models/deposit';
import { Icon, Modal, Text } from '@components';
import { Card } from 'react-native-paper';
import { useTheme, useNavigation, useTokens } from '@hooks';
import { network } from '@models/network';
import { debounce } from 'lodash';
import { Wallet } from 'ethers';
import { useState } from '@hookstate/core';
import Warning from '@src/screens/ExchangeScreen/Warning/Warning';
import ProgressButton from '@src/components/ProgressButton';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import TokenCard from '../../ExchangeScreen/TokenCard/TokenCard';
import GasSelector from '../../ExchangeScreen/GasSelector/GasSelector';
import { makeStyles } from './Deposit.styles';

const Deposit = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const { tokens } = useTokens();
	const styles = makeStyles(colors);
	const { address, privateKey } = globalWalletState().value;
	const { market } = globalDepositState().value;
	const { gas } = useState(globalExchangeState()).value;
	const { gweiValue = 0 } = gas || {};
	const [nativeToken, setNativeToken] = React.useState<ParaswapToken>();
	const [token] = React.useState<ParaswapToken>(aaveMarketTokenToParaswapToken(market));
	const [tokenBalance, setTokenBalance] = React.useState('0');
	const [amount, setAmount] = React.useState('0');
	const [waitingTransaction, setWaitingTransaction] = React.useState(false);
	const [transactionHash, setTransactionHash] = React.useState('');

	const balanceFrom = useCallback(
		(paraSwapToken: ParaswapToken | undefined): number => {
			if (!paraSwapToken) {
				return 0;
			}
			const walletToken = tokens?.find(
				(owned) => owned.symbol.toLowerCase() === paraSwapToken.symbol.toLowerCase()
			);
			const isNativeToken = nativeToken && nativeToken.symbol === walletToken?.symbol;
			if (isNativeToken && walletToken) {
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return Math.max(+walletToken.balance - gasPrice, 0);
			}
			return walletToken ? +walletToken.balance : 0;
		},
		[tokens, nativeToken, gas]
	);

	const updateAmount = (value: string) => {
		const formatedValue = value.replace(/\,/g, '.');
		if (formatedValue && !formatedValue.endsWith('.') && !formatedValue.startsWith('.')) {
			setAmount(formatedValue);
		}
	};

	const enoughForGas = nativeToken && balanceFrom(nativeToken) > 0;
	const canDeposit =
		token && +tokenBalance > 0 && +amount > 0 && +tokenBalance >= +amount && enoughForGas && gweiValue > 0;
	const onDeposit = async () => {
		if (canDeposit) {
			setWaitingTransaction(true);
			const transaction = await depositTransaction({
				address,
				amount,
				token: token.address,
				decimals: token.decimals,
				interestBearingToken: market.address,
				gweiValue
			});
			console.log('Deposit API', transaction);

			const { from, to, data, maxFeePerGas, maxPriorityFeePerGas, gas: gasLimit } = transaction;

			const provider = await getProvider();
			const wallet = new Wallet(privateKey, provider);
			const chainId = await wallet.getChainId();
			const nonce = await provider.getTransactionCount(address, 'latest');
			const txDefaults = {
				from,
				to,
				data,
				nonce,
				gasLimit,
				maxFeePerGas,
				maxPriorityFeePerGas,
				type: 2,
				chainId
			};
			console.log('Deposit', txDefaults);
			const signedTx = await wallet.signTransaction(txDefaults);
			const { hash, wait } = await provider.sendTransaction(signedTx as string);
			if (hash) {
				console.log('Deposit', hash);
				await wait();
				setTransactionHash(hash);
				navigation.navigate('DepositSuccessScreen');
			} else {
				console.error('Error depositing');
			}
		}
	};

	useEffect(() => {
		const loadNativeToken = async () => {
			const {
				nativeToken: { symbol: nativeTokenSymbol }
			} = await network();
			const native = nativeTokens[nativeTokenSymbol as keyof NativeTokens];
			setNativeToken(native);
		};

		loadNativeToken();
	}, []);

	useEffect(() => {
		if (token && tokens && tokens.length > 0) {
			const balance = balanceFrom(token);
			setTokenBalance(balance.toFixed(token.decimals));
		} else {
			setTokenBalance('0');
		}
	}, [tokens, token]);

	return (
		<>
			<BasicLayout>
				<View style={styles.header}>
					<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
						<Icon name="arrowBackStroke" color="text7" size={24} />
					</TouchableOpacity>
				</View>
				<View style={styles.deposit}>
					{token && tokenBalance && (
						<View style={styles.depositHeadline}>
							<Text type="h3" weight="extraBold">
								Deposit
							</Text>
							<Text type="a" weight="regular" color="text3">
								Balance:{' '}
								<Text type="a" weight="extraBold" color="text3">
									{tokenBalance} {token.symbol}
								</Text>
							</Text>
						</View>
					)}

					<Card style={styles.tokenCard}>
						<TokenCard token={token} balance={tokenBalance} updateQuotes={debounce(updateAmount, 500)} />
					</Card>

					<GasSelector />
				</View>

				<View style={styles.depositButton}>
					{nativeToken && !enoughForGas && <Warning label="Not enough balance for gas" />}
					<ProgressButton title="Hold to Deposit" disabled={!canDeposit} onFinish={onDeposit} />
				</View>
				<KeyboardSpacer />
			</BasicLayout>
			<Modal isVisible={waitingTransaction} onDismiss={() => navigation.navigate('DepositSuccessScreen')}>
				<TransactionWaitModal
					onDismiss={() => navigation.navigate('DepositSuccessScreen')}
					fromToken={token}
					toToken={{ img: market.appImageUrl, symbol: 'Aave' } as ParaswapToken}
					transactionHash={transactionHash}
					deposit
				/>
			</Modal>
		</>
	);
};

export default Deposit;
