import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BasicLayout } from '@layouts';
import { ParaswapToken } from '@models/token';
import { Icon, Modal, Text, ProgressButton } from '@components';
import { Card } from 'react-native-paper';
import { useTheme, useNavigation, useAmplitude } from '@hooks';
import { debounce } from 'lodash';
import Warning from '@src/screens/ExchangeScreen/Warning/Warning';
import TransactionWaitModal from '@src/components/TransactionWaitModal/TransactionWaitModal';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { tokenBalanceFormat } from '@helpers/utilities';
import TokenCard from '../../ExchangeScreen/TokenCard/TokenCard';
import GasSelector from '../../ExchangeScreen/GasSelector/GasSelector';
import { useDeposit } from './Deposit.hooks';
import { makeStyles } from './Deposit.styles';

const Deposit = () => {
	const { track } = useAmplitude();
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const {
		token,
		tokenBalance,
		updateAmount,
		canDeposit,
		onDeposit,
		waitingTransaction,
		transactionHash,
		nativeToken,
		enoughForGas,
		market
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
						<TokenCard token={token} balance={tokenBalance} updateQuotes={debounce(updateAmount, 500)} />
					</Card>

					<GasSelector />
				</View>

				<View style={styles.depositButton}>
					{nativeToken && !enoughForGas && <Warning label="Not enough balance for gas" />}
					<ProgressButton title="Hold to Deposit" disabled={!canDeposit} onFinish={onDeposit} />
				</View>
				<KeyboardSpacer />
			</BasicLayout>
			<Modal isVisible={waitingTransaction} onDismiss={() => navigation.navigate('DepositSuccessScreen')}>
				<TransactionWaitModal
					onDismiss={() => navigation.navigate('DepositSuccessScreen')}
					fromToken={token}
					toToken={{ img: market.appImageUrl, symbol: 'Aave' } as ParaswapToken}
					transactionHash={transactionHash}
					deposit
				/>
			</Modal>
		</>
	);
};

export default Deposit;
