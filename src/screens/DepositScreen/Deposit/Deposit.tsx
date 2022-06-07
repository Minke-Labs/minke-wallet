import React, { useEffect } from 'react';
import { View } from 'react-native';
import { BasicLayout } from '@layouts';
import { ParaswapToken } from '@models/token';
import { Modal, TokenCard, HapticButton, ModalReusables, Header, GasSelector, Paper } from '@components';
import { useNavigation, useAmplitude, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import Warning from '@src/screens/ExchangeScreen/Warning/Warning';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useDeposit } from './Deposit.hooks';
import styles from './Deposit.styles';

const Deposit = () => {
	const { i18n } = useLanguage();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const {
		tokens,
		token,
		tokenBalance,
		updateAmount,
		canDeposit,
		onDeposit,
		waitingTransaction,
		transactionHash,
		nativeToken,
		enoughForGas,
		gaslessEnabled,
		searchVisible,
		hideModal,
		showModal,
		onTokenSelect,
		apy,
		selectedProtocol,
		blockchainError,
		setBlockchainError
	} = useDeposit();

	useEffect(() => {
		track('Deposit Screen Opened');
	}, []);

	return (
		<>
			<BasicLayout>
				<Header
					title={`${i18n.t('DepositScreen.Deposit.deposit')} ${token?.symbol ?? ''}`}
					marginBottom={60}
				/>

				<Paper padding={16} marginBottom={42}>
					<TokenCard
						onPress={showModal}
						tokens={tokens}
						token={token}
						balance={tokenBalance}
						updateQuotes={debounce(updateAmount, 500)}
						apy={apy}
						tokenBalance={tokenBalance}
					/>
				</Paper>

				{!gaslessEnabled && <GasSelector />}

				<View style={styles.depositButton}>
					{nativeToken && !enoughForGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}
					<HapticButton
						title={i18n.t('Components.Buttons.deposit')}
						disabled={!canDeposit}
						onPress={onDeposit}
					/>
				</View>
				<KeyboardSpacer />
			</BasicLayout>

			<Modal isVisible={searchVisible} onDismiss={hideModal}>
				<ModalReusables.SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={tokens?.map((t) => t.symbol.toLowerCase())}
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
						toToken={{ symbol: selectedProtocol?.name } as ParaswapToken}
						transactionHash={transactionHash}
						deposit
					/>
				)}
			</Modal>
			<Modal isVisible={blockchainError} onDismiss={() => setBlockchainError(false)}>
				{blockchainError && (
					<ModalReusables.Error
						description={i18n.t('ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setBlockchainError(false)}
						showHeader
					/>
				)}
			</Modal>
		</>
	);
};

export default Deposit;
