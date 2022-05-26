import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BasicLayout } from '@layouts';
import { ParaswapToken } from '@models/token';
import { Icon, Modal, Text, TokenCard, HapticButton } from '@components';
import { useNavigation, useAmplitude, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import Warning from '@src/screens/ExchangeScreen/Warning/Warning';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import SearchTokens from '@src/screens/ExchangeScreen/SearchTokens/SearchTokens';
import GasSelector from '../../ExchangeScreen/GasSelector/GasSelector';
import { useDeposit } from './Deposit.hooks';
import styles from './Deposit.styles';

interface HeaderProps {
	token: ParaswapToken | undefined;
}

const Header: React.FC<HeaderProps> = ({ token }) => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	return (
		<>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>

			<View style={styles.depositHeadline}>
				<Text type="hSmall" weight="extraBold">
					{i18n.t('DepositScreen.Deposit.deposit')} {token?.symbol}
				</Text>
			</View>
		</>
	);
};

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
		apy
	} = useDeposit();

	useEffect(() => {
		track('Deposit Screen Opened');
	}, []);

	return (
		<>
			<BasicLayout>

				<Header {...{ token, tokenBalance }} />

				<View style={{ paddingHorizontal: 24, marginBottom: 42 }}>
					<TokenCard
						onPress={showModal}
						token={token}
						balance={tokenBalance}
						updateQuotes={debounce(updateAmount, 500)}
						apy={apy}
						tokenBalance={tokenBalance}
					/>
				</View>

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
				<SearchTokens
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
					<TransactionWaitModal
						onDismiss={() => navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' })}
						fromToken={token}
						toToken={{ symbol: 'Aave' } as ParaswapToken}
						transactionHash={transactionHash}
						deposit
					/>
				)}
			</Modal>
		</>
	);
};

export default Deposit;
