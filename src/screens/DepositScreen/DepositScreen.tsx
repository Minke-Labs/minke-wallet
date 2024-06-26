import React, { useEffect } from 'react';
import { BasicLayout } from '@layouts';
import { MinkeToken } from '@models/types/token.types';
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
	View,
	DepositProtocolSelector,
	BlankStates
} from '@components';
import { useNavigation, useAmplitude, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { os } from '@styles';
import { useDepositScreen } from './DepositScreen.hooks';

const DepositScreen: React.FC = () => {
	const { i18n } = useLanguage();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const {
		tokens,
		token,
		updateAmount,
		canDeposit,
		onDeposit,
		waitingTransaction,
		transactionHash,
		enoughForGas,
		gaslessEnabled,
		searchVisible,
		hideModal,
		showModal,
		onTokenSelect,
		blockchainError,
		setBlockchainError,
		canSendTransactions,
		needToChangeNetwork,
		gasUnits,
		depositProtocol,
		onChangeDepositProtocol,
		depositProtocolSearch,
		setDepositProtocolSearch,
		apy,
		network
	} = useDepositScreen();

	useEffect(() => {
		track('Deposit Screen Opened');
	}, []);

	if (!tokens) {
		return <BlankStates.Type1 title={i18n.t('Components.BlankStates.Deposit')} />;
	}

	return (
		<>
			<BasicLayout>
				<Header
					title={`${i18n.t('DepositScreen.Deposit.deposit')}${token ? ` ${token.symbol}` : ''} ${
						depositProtocol ? `${i18n.t('DepositScreen.Deposit.on')} ${depositProtocol.name}` : ''
					}`}
					marginBottom="l"
				/>

				<Paper p="xs" mb="m" mh="xs">
					<TokenCard
						onPress={showModal}
						token={token}
						updateQuotes={debounce(updateAmount, 500)}
						apy={apy}
						depositProtocol={depositProtocol}
					/>
				</Paper>

				<Paper p="xs" mh="xs" mb="l">
					<DepositProtocolSelector
						onPress={() => setDepositProtocolSearch(true)}
						protocol={depositProtocol}
					/>
				</Paper>

				<View style={{ display: gaslessEnabled ? 'none' : 'flex' }}>
					<GasSelector gasLimit={gasUnits} network={network} />
				</View>

				<View ph="s" mb="xs" style={{ marginTop: os === 'android' ? undefined : 'auto' }}>
					{!enoughForGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}
					<HapticButton
						title={i18n.t('Components.Buttons.deposit')}
						disabled={!canDeposit}
						onPress={onDeposit}
					/>
					{!canSendTransactions && (
						<View style={{ marginTop: 8 }}>
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
					chainId={token?.chainId}
				/>
			</ModalBase>

			<ModalBase isVisible={depositProtocolSearch} onDismiss={() => setDepositProtocolSearch(false)}>
				<ModalReusables.SearchDepositProtocols
					visible
					onDismiss={() => setDepositProtocolSearch(false)}
					onChangeDepositProtocol={onChangeDepositProtocol}
					selectedProtocol={depositProtocol}
				/>
			</ModalBase>

			<ModalBase
				isVisible={waitingTransaction}
				onDismiss={() => navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' })}
			>
				{!!token && (
					<ModalReusables.TransactionWait
						onDismiss={() => navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' })}
						fromToken={token}
						toToken={{ symbol: depositProtocol?.name } as MinkeToken}
						transactionHash={transactionHash}
						deposit
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

export default DepositScreen;
