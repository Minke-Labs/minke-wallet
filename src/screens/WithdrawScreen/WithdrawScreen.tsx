import React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Modal, TokenCard, HapticButton, ModalReusables, Header, GasSelector, Paper } from '@components';
import { BasicLayout } from '@layouts';
import { View } from 'react-native';
import { useNavigation, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import { ParaswapToken } from '@models/token';
import Warning from '../ExchangeScreen/Warning/Warning';
import useWithdrawScreen from './WithdrawScreen.hooks';
import styles from './WithdrawScreen.styles';

const WithdrawScreen = () => {
	const navigation = useNavigation();
	const {
		searchVisible,
		hideModal,
		showModal,
		token,
		tokenBalance,
		updateAmount,
		nativeToken,
		enoughForGas,
		canWithdraw,
		onTokenSelect,
		onWithdraw,
		waitingTransaction,
		transactionHash,
		tokens,
		gaslessEnabled,
		selectedProtocol,
		blockchainError,
		setBlockchainError
	} = useWithdrawScreen();
	const { i18n } = useLanguage();

	return (
		<>
			<BasicLayout>
				<Header title={`${i18n.t('WithdrawScreen.withdraw')} ${token?.symbol ?? ''}`} marginBottom={60} />

				<Paper padding={16} marginBottom={42}>
					<TokenCard
						onPress={showModal}
						tokens={tokens}
						token={token}
						balance={tokenBalance}
						updateQuotes={debounce(updateAmount, 500)}
						tokenBalance={tokenBalance}
					/>
				</Paper>

				{!gaslessEnabled && <GasSelector />}

				<View style={styles.depositButton}>
					{nativeToken && !enoughForGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}
					<HapticButton
						title={i18n.t('Components.Buttons.withdraw')}
						disabled={!canWithdraw}
						onPress={onWithdraw}
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
						onDismiss={() => navigation.navigate('SaveScreen')}
						fromToken={{ symbol: selectedProtocol?.name } as ParaswapToken}
						toToken={token!}
						transactionHash={transactionHash}
						withdraw
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

export default WithdrawScreen;
