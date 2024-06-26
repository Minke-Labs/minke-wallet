import { debounce } from 'lodash';
import React from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RNUxcam from 'react-native-ux-cam';

import {
	GasSelector, HapticButton, Header, ModalBase, ModalReusables, Paper, TokenCard, View, Warning,
	WatchModeTag
} from '@components';
import { useLanguage, useNavigation } from '@hooks';
import { BasicLayout } from '@layouts';
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
		gasUnits,
		network
	} = useWithdrawScreen();
	const { i18n } = useLanguage();

	return (
		<>
			<BasicLayout>
				<Header
					title={`${i18n.t('WithdrawScreen.withdraw')}${token ? ` ${token.symbol}` : ''} ${
						selectedProtocol ? `${i18n.t('DepositScreen.Deposit.on')} ${selectedProtocol.name}` : ''
					}`}
					marginBottom="xxl"
				/>

				<Paper p="xs" mb="l" mh="xs">
					<TokenCard
						onPress={showModal}
						token={token}
						updateQuotes={debounce(updateAmount, 500)}
						apy={apy}
						depositProtocol={selectedProtocol}
					/>
				</Paper>

				<View style={{ display: gaslessEnabled ? 'none' : 'flex' }}>
					<GasSelector gasLimit={gasUnits} network={network} />
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
							<WatchModeTag needToChangeNetwork={needToChangeNetwork} network={network} />
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
					selected={[`${token?.address.toLowerCase()}-${token?.chainId}`]}
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
