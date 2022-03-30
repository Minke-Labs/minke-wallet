/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, Linking, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '@hooks';
import { ParaswapToken } from '@models/token';
import { network } from '@models/network';
import { smallWalletAddress } from '@src/model/wallet';
import { ModalHeader, Text, Icon, ActivityIndicator } from '@components';
import { TokenType } from '@src/styles';
import { makeStyles } from './TransactionWaitModal.styles';
import Token from '../Token/Token';

const TransactionWaitModal = ({
	onDismiss,
	fromToken,
	toToken,
	transactionHash,
	deposit = false,
	withdraw = false
}: {
	onDismiss: () => void;
	fromToken: ParaswapToken;
	toToken: ParaswapToken;
	transactionHash: string;
	deposit?: boolean;
	withdraw?: boolean;
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const openTransaction = async () => {
		const { etherscanURL } = await network();
		Linking.openURL(`${etherscanURL}/tx/${transactionHash}`);
	};

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.modalRow}>
				<View style={{ marginRight: 56 }}>
					<Token name={fromToken.symbol.toLowerCase() as TokenType} size={50} />
				</View>
				<View style={styles.exchangeResumeBackground}>
					<Icon name="arrowRight" color="cta1" size={24} />
				</View>
				<Token name={toToken.symbol.toLowerCase() as TokenType} size={50} />
			</View>
			<View style={styles.modalColumn}>
				<Text type="h3" weight="extraBold" color="text1">
					Processing Transaction
				</Text>
			</View>
			<View style={styles.modalRow}>
				<Text type="p2" weight="medium" color="text3">
					{deposit ? 'Depositing' : withdraw ? 'Withdrawing' : 'Exchanging'}{' '}
				</Text>
				<Text type="p2" weight="extraBold" color="text3">
					{' '}
					{fromToken.symbol}
				</Text>
				{!withdraw && (
					<>
						<Text type="p2" weight="medium" color="text3">
							{' '}
							{deposit ? 'in' : 'for'}{' '}
						</Text>
						<Text type="p2" weight="extraBold" color="text3">
							{' '}
							{toToken.symbol}
						</Text>
					</>
				)}
			</View>
			<View style={styles.modalRow}>
				<Text type="a" weight="medium" color="text3">
					Transaction:
				</Text>
				<Button mode="text" onPress={openTransaction}>
					<Text type="a" weight="medium" color="text3">
						{transactionHash ? smallWalletAddress(transactionHash) : <ActivityIndicator />}
					</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
};

export default TransactionWaitModal;
