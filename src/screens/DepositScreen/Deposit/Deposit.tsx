import React, { useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { BasicLayout } from '@layouts';
import { MinkeToken } from '@models/token';
import { Modal, TokenCard, HapticButton, ModalReusables, Header, GasSelector, Paper, WatchModeTag } from '@components';
import {
	useNavigation,
	useAmplitude,
	useLanguage,
	useBiconomy,
	useNativeToken,
	useTransactions,
	useWalletManagement
} from '@hooks';
import { debounce } from 'lodash';
import Warning from '@src/screens/ExchangeScreen/Warning/Warning';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { globalExchangeState } from '@stores/ExchangeStore';
import { usdCoinSettingsKey } from '@models/deposit';
import Logger from '@utils/logger';
import { toBn } from 'evm-bn';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import Deposit from '@src/services/deposit/DepositService';
import { captureException } from '@sentry/react-native';
import { DepositProps } from './Deposit.types';
import styles from './Deposit.styles';

const DepositS: React.FC<DepositProps> = ({
	apy,
	depositableToken,
	selectedProtocol,
	setSelectedUSDCoin,
	token,
	setToken,
	depositableTokens
}) => {
	const { i18n } = useLanguage();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { biconomy, gaslessEnabled } = useBiconomy();
	const { nativeToken, balance } = useNativeToken();
	const { address, privateKey } = globalWalletState().value;
	const { gas } = useState(globalExchangeState()).value;
	const { gweiValue = 0 } = gas || {};
	const [amount, setAmount] = React.useState('0');
	const [waitingTransaction, setWaitingTransaction] = React.useState(false);
	const [blockchainError, setBlockchainError] = React.useState(false);
	const [transactionHash, setTransactionHash] = React.useState('');
	const [searchVisible, setSearchVisible] = React.useState(false);
	const { addPendingTransaction } = useTransactions();
	const {
		canSendTransactions,
		needToChangeNetwork,
		walletConnect,
		connector
	} = useWalletManagement();

	const updateAmount = (value: string) => {
		const formatedValue = value.replace(/,/g, '.');
		if (!formatedValue || (!formatedValue.endsWith('.') && !formatedValue.startsWith('.'))) {
			setAmount(formatedValue);
		}
	};

	const enoughForGas =
		gaslessEnabled || (balance && gweiValue ? balance.gte(parseUnits(gweiValue.toString(), 'gwei')) : true);
	const canDeposit =
		token &&
		token.balance &&
		+amount > 0 &&
		+token.balance >= +amount &&
		enoughForGas &&
		(gaslessEnabled || gweiValue > 0); // if gasless we dont need a gwei value

	const onDeposit = async () => {
		Keyboard.dismiss();
		if (canDeposit && depositableToken && selectedProtocol && token) {
			setWaitingTransaction(true);
			try {
				const hash = await new Deposit(selectedProtocol.id).deposit({
					address,
					privateKey,
					amount: formatUnits(toBn(amount, token.decimals), 'wei'),
					minAmount: formatUnits(toBn((Number(amount) * 0.97).toString(), token.decimals), 'wei'),
					gasPrice: gweiValue.toString(),
					depositableToken,
					gasless: gaslessEnabled,
					biconomy,
					walletConnect,
					connector
				});

				if (hash) {
					Logger.log(`Deposit ${JSON.stringify(hash)}`);
					setTransactionHash(hash);
					track('Deposited', {
						token: token.symbol,
						amount,
						hash,
						gasless: gaslessEnabled
					});
					addPendingTransaction({
						from: token.address,
						destination: address,
						hash,
						txSuccessful: true,
						pending: true,
						timeStamp: (new Date().getTime() / 1000).toString(),
						amount,
						direction: 'exchange',
						symbol: token.symbol,
						subTransactions: [
							{ type: 'outgoing', symbol: token.symbol, amount: +amount },
							{ type: 'incoming', symbol: depositableToken.interestBearingToken.symbol, amount: +amount }
						]
					});
					navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' });
				} else {
					Logger.error('Error depositing');
				}
			} catch (error) {
				setWaitingTransaction(false);
				captureException(error);
				Logger.error('Deposit blockchain error', error);
				setBlockchainError(true);
			}
		}
	};

	const showModal = () => {
		Keyboard.dismiss();
		setSearchVisible(true);
	};

	const hideModal = () => {
		Keyboard.dismiss();
		setSearchVisible(false);
	};

	const onTokenSelect = async (selectedToken: MinkeToken) => {
		hideModal();
		setToken(selectedToken);
		await AsyncStorage.setItem(usdCoinSettingsKey, selectedToken.symbol);
		setSelectedUSDCoin(selectedToken.symbol);
	};

	useEffect(() => {
		track('Deposit Screen Opened');
	}, []);

	return (
		<>
			<BasicLayout>
				<Header title={`${i18n.t('DepositScreen.Deposit.deposit')} ${token?.symbol ?? ''}`} marginBottom={60} />

				<Paper padding={16} marginBottom={42}>
					<TokenCard
						onPress={showModal}
						token={token}
						updateQuotes={debounce(updateAmount, 500)}
						apy={apy}
					/>
				</Paper>

				<View style={{ display: gaslessEnabled ? 'none' : 'flex' }}>
					<GasSelector />
				</View>

				<View style={styles.depositButton}>
					{!!nativeToken && !enoughForGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}
					<HapticButton
						title={i18n.t('Components.Buttons.deposit')}
						disabled={!canDeposit}
						onPress={onDeposit}
					/>
					{!canSendTransactions && (
						<View style={{ marginTop: 8 }}>
							<WatchModeTag needToChangeNetwork={needToChangeNetwork} />
						</View>
					)}
				</View>
				<KeyboardSpacer />
			</BasicLayout>

			<Modal isVisible={searchVisible} onDismiss={hideModal}>
				<ModalReusables.SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={depositableTokens}
					showOnlyOwnedTokens
					selected={[token?.symbol.toLowerCase()]}
				/>
			</Modal>

			<Modal
				isVisible={waitingTransaction}
				onDismiss={() => navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' })}
			>
				{!!token && (
					<ModalReusables.TransactionWait
						onDismiss={() => navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' })}
						fromToken={token}
						toToken={{ symbol: selectedProtocol?.name } as MinkeToken}
						transactionHash={transactionHash}
						deposit
					/>
				)}
			</Modal>
			<Modal isVisible={blockchainError} onDismiss={() => setBlockchainError(false)}>
				{blockchainError && (
					<ModalReusables.Error
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setBlockchainError(false)}
						showHeader
					/>
				)}
			</Modal>
		</>
	);
};

export default DepositS;
