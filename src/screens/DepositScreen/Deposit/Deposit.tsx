import React, { useEffect } from 'react';
import { View } from 'react-native';
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
	BlankStates,
	Warning
} from '@components';
import { useNavigation, useAmplitude, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { DepositableToken } from '@models/types/depositTokens.types';
import { DepositProtocol } from '@models/deposit';
import { useDeposit } from './Deposit.hooks';
import styles from './Deposit.styles';

interface DepositProps {
	apy: string;
	depositableToken: DepositableToken | undefined;
	selectedProtocol: DepositProtocol | undefined;
	setSelectedUSDCoin: React.Dispatch<React.SetStateAction<string>>;
}

const Deposit: React.FC<DepositProps> = ({ apy, depositableToken, selectedProtocol, setSelectedUSDCoin }) => {
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
		nativeToken,
		enoughForGas,
		gaslessEnabled,
		searchVisible,
		hideModal,
		showModal,
		onTokenSelect,
		blockchainError,
		setBlockchainError,
		canSendTransactions,
		needToChangeNetwork
	} = useDeposit({ depositableToken, selectedProtocol, setSelectedUSDCoin });

	useEffect(() => {
		track('Deposit Screen Opened');
	}, []);

	if (!token) {
		return <BlankStates.Deposit />;
	}

	return (
		<>
			<BasicLayout>
				<Header title={`${i18n.t('DepositScreen.Deposit.deposit')} ${token?.symbol ?? ''}`} marginBottom={60} />

				<Paper p="xs" mb="l" mh="xs">
					<TokenCard onPress={showModal} token={token} updateQuotes={debounce(updateAmount, 500)} apy={apy} />
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

			<ModalBase isVisible={searchVisible} onDismiss={hideModal}>
				<ModalReusables.SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelect}
					ownedTokens={tokens}
					showOnlyOwnedTokens
					selected={[token?.symbol.toLowerCase()]}
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
						toToken={{ symbol: selectedProtocol?.name } as MinkeToken}
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

export default Deposit;
