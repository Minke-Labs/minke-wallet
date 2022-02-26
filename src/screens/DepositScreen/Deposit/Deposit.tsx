import React, { useEffect, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getProvider, getWalletTokens, WalletToken } from '@models/wallet';
import { WelcomeLayout } from '@layouts';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeTokens, nativeTokens, ParaswapToken, stablecoins } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { globalExchangeState } from '@stores/ExchangeStore';
import { aaveMarketTokenToParaswapToken, depositTransaction } from '@models/deposit';
import { Icon, Modal, Text } from '@components';
import { Card } from 'react-native-paper';
import { useTheme } from '@hooks';
import { network } from '@models/network';
import { debounce } from 'lodash';
import { Wallet } from 'ethers';
import Warning from '@src/screens/ExchangeScreen/Warning/Warning';
import ProgressButton from '@src/components/ProgressButton';
import TokenCard from '../../ExchangeScreen/TokenCard';
import GasSelector from '../../ExchangeScreen/GasSelector';
import { makeStyles } from './Deposit.styles';
import SearchTokens from '../../ExchangeScreen/SearchTokens';

const Deposit = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { address, privateKey } = globalWalletState().value;
	const { market } = globalDepositState().value;
	const { gas } = globalExchangeState().value;
	const [nativeToken, setNativeToken] = React.useState<ParaswapToken>();
	const [token, setToken] = React.useState<ParaswapToken>(aaveMarketTokenToParaswapToken(market));
	const [tokenBalance, setTokenBalance] = React.useState('0');
	const [amount, setAmount] = React.useState('0');
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>([]);
	const [availableTokens, setAvailableTokens] = React.useState<Array<string>>([]);

	const hideModal = () => setSearchVisible(false);

	const balanceFrom = useCallback(
		(paraSwapToken: ParaswapToken | undefined): number => {
			if (!paraSwapToken) {
				return 0;
			}
			const walletToken = walletTokens?.find(
				(owned) => owned.symbol.toLowerCase() === paraSwapToken.symbol.toLowerCase()
			);
			const isNativeToken = nativeToken && nativeToken.symbol === walletToken?.symbol;
			if (isNativeToken && walletToken) {
				const { gweiValue } = gas || {};
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return Math.max(walletToken.balance - gasPrice, 0);
			}
			return walletToken?.balance || 0;
		},
		[walletTokens, nativeToken, gas]
	);

	const onTokenSelected = (t: ParaswapToken) => {
		setToken(t);
		hideModal();
	};

	const updateAmount = (value: string) => {
		const formatedValue = value.replace(/\,/g, '.');
		if (formatedValue && !formatedValue.endsWith('.') && !formatedValue.startsWith('.')) {
			setAmount(formatedValue);
		}
	};

	const enoughForGas = true;
	const canDeposit = token && +tokenBalance > 0 && +tokenBalance >= +amount && enoughForGas;
	const onDeposit = async () => {
		if (canDeposit) {
			const transaction = await depositTransaction({
				address,
				amount,
				token: token.address,
				decimals: token.decimals,
				interestBearingToken: market.address
			});

			console.log('Came from zapper', transaction);

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
			const signedTx = await wallet.signTransaction(txDefaults);
			const { hash, wait } = await provider.sendTransaction(signedTx as string);
			console.log('hash', hash);
			if (hash) {
				await wait();
				navigation.navigate('Save');
			} else {
				console.error('Error depositing');
			}
		}
	};

	useEffect(() => {
		const getTokens = async () => {
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map((product) => product.assets.map((asset) => asset)).flat();
			setWalletTokens(tokens);
			const available = tokens.filter(({ symbol }) => stablecoins.includes(symbol));
			setAvailableTokens(available.map(({ symbol }) => symbol.toLowerCase()));
		};

		const loadNativeToken = async () => {
			const {
				nativeToken: { symbol: nativeTokenSymbol }
			} = await network();
			const native = nativeTokens[nativeTokenSymbol as keyof NativeTokens];
			setNativeToken(native);
		};

		loadNativeToken();
		getTokens();
	}, []);

	useEffect(() => {
		if (token && walletTokens.length > 0) {
			const balance = balanceFrom(token);
			setTokenBalance(balance.toString());
		} else {
			setTokenBalance('0');
		}
	}, [walletTokens, token]);

	return (
		<>
			<WelcomeLayout>
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
						<TokenCard
							token={token}
							onPress={() => setSearchVisible(true)}
							balance={tokenBalance}
							updateQuotes={debounce(updateAmount, 500)}
						/>
					</Card>

					<GasSelector />
				</View>

				<View style={styles.depositButton}>
					{!enoughForGas && <Warning label="Not enough balance for gas" />}

					<ProgressButton title="Hold to Deposit" disabled={!canDeposit} onFinish={onDeposit} />
				</View>
			</WelcomeLayout>
			<Modal isVisible={searchVisible} onDismiss={hideModal}>
				<SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelected}
					ownedTokens={availableTokens}
					showOnlyOwnedTokens
					selected={[token.symbol.toLowerCase()]}
				/>
			</Modal>
		</>
	);
};

export default Deposit;
