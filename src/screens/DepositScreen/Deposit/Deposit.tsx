import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BasicLayout } from '@layouts';
import { ParaswapToken } from '@models/token';
import { Icon, Modal, Text, TokenCard, HapticButton } from '@components';
import { Card } from 'react-native-paper';
import { useTheme, useNavigation, useAmplitude, useLanguage } from '@hooks';
import { debounce } from 'lodash';
import Warning from '@src/screens/ExchangeScreen/Warning/Warning';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { tokenBalanceFormat } from '@helpers/utilities';
import SearchTokens from '@src/screens/ExchangeScreen/SearchTokens/SearchTokens';
import GasSelector from '../../ExchangeScreen/GasSelector/GasSelector';
import { useDeposit } from './Deposit.hooks';
import { makeStyles } from './Deposit.styles';

const Deposit = () => {
	const { i18n } = useLanguage();
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
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
		market,
		gaslessEnabled,
		searchVisible,
		hideModal,
		showModal,
		onTokenSelect
	} = useDeposit();

	useEffect(() => {
		track('Deposit Screen Opened');
	}, []);

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
									{tokenBalanceFormat(tokenBalance, 6)} {token.symbol}
								</Text>
							</Text>
						</View>
					)}

					<Card style={styles.tokenCard}>
						<TokenCard
							onPress={showModal}
							token={token}
							balance={tokenBalance}
							updateQuotes={debounce(updateAmount, 500)}
						/>
					</Card>

					<View style={{ display: gaslessEnabled ? 'none' : 'flex' }}>
						<GasSelector />
					</View>

					{market && (
						<View style={styles.interestContainer}>
							<Icon name="iconUp" color="alert3" size={14} style={{ marginRight: 8 }} />
							<Text weight="medium" type="a" color="alert3">
								{(market.supplyApy * 100).toFixed(2)}% interest p.a.
							</Text>
						</View>
					)}
				</View>

				<View style={styles.depositButton}>
					{nativeToken && !enoughForGas && <Warning label={i18n.t('Logs.not_enough_balance_for_gas')} />}
					<HapticButton title="Deposit" disabled={!canDeposit} onPress={onDeposit} />
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
				<TransactionWaitModal
					onDismiss={() => navigation.navigate('DepositWithdrawalSuccessScreen', { type: 'deposit' })}
					fromToken={token}
					toToken={{ symbol: 'Aave' } as ParaswapToken}
					transactionHash={transactionHash}
					deposit
				/>
			</Modal>
		</>
	);
};

export default Deposit;
