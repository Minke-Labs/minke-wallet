import React from 'react';
import RNUxcam from 'react-native-ux-cam';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
	ModalBase,
	TokenCard,
	HapticButton,
	ModalReusables,
	Header,
	GasSelector,
	Paper,
	WatchModeTag,
	Warning,
	View
} from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import { MinkeToken } from '@models/types/token.types';
import { os } from '@styles';
import useWithdrawScreen from './WithdrawScreen.hooks';

const WithdrawScreen = () => {
	RNUxcam.tagScreenName('WithdrawScreen');
	const navigation = useNavigation();
	const {
		searchVisible,
		hideModal,
		showModal,
		token,
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
		apy,
		blockchainError,
		setBlockchainError,
		canSendTransactions,
		needToChangeNetwork,
		gasUnits
	} = useWithdrawScreen();
	const { i18n } = useLanguage();

	return (
		<>
			<BasicLayout>
				<Header
					onPress={() => navigation.goBack()}
					title={`${i18n.t('WithdrawScreen.withdraw')} ${token?.symbol ?? ''}`}
					mb="xxl"
				/>

				<Paper p="xs" mb="l" mh="xs">
					<TokenCard onPress={showModal} token={token} updateQuotes={debounce(updateAmount, 500)} apy={apy} />
				</Paper>

				<View style={{ display: gaslessEnabled ? 'none' : 'flex' }}>
					<GasSelector gasLimit={gasUnits} />
				</View>

				<View ph="s" mb="xs" style={{ marginTop: os === 'android' ? undefined : 'auto' }}>
					{nativeToken && !enoughForGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}
					<HapticButton
						title={i18n.t('Components.Buttons.withdraw')}
						disabled={!canWithdraw}
						onPress={onWithdraw}
					/>
					{!canSendTransactions && (
						<View mt="xxs">
							<WatchModeTag needToChangeNetwork={needToChangeNetwork} />
						</View>
					)}
				</View>

				<KeyboardSpacer />
			</BasicLayout>

			<ModalBase isVisible={searchVisible} onDismiss={hideModal}>
				<ModalReusables.SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={tokens}
					showOnlyOwnedTokens
					selected={[token?.symbol.toLowerCase()]}
					withdraw
				/>
			</ModalBase>

			<ModalBase
				isVisible={waitingTransaction}
				onDismiss={() => navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' })}
			>
				{!!token && (
					<ModalReusables.TransactionWait
						onDismiss={() => navigation.navigate('SaveScreen')}
						fromToken={{ symbol: selectedProtocol?.name } as MinkeToken}
						toToken={token!}
						transactionHash={transactionHash}
						withdraw
					/>
				)}
			</ModalBase>
			<ModalBase isVisible={blockchainError} onDismiss={() => setBlockchainError(false)}>
				{blockchainError && (
					<ModalReusables.Error
						description={i18n.t('Components.ModalReusables.Error.Blockchain.description')}
						onDismiss={() => setBlockchainError(false)}
						showHeader
					/>
				)}
			</ModalBase>
		</>
	);
};

export default WithdrawScreen;
