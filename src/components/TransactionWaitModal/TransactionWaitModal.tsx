/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { View, Linking, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '@hooks';
import { network } from '@models/network';
import { getProvider, smallWalletAddress } from '@src/model/wallet';
import { ModalHeader, Text, Icon, ActivityIndicator } from '@components';
import { TokenType } from '@src/styles';
import { makeStyles } from './TransactionWaitModal.styles';
import Token from '../Token/Token';
import { TransactionWaitModalProps } from './TransactionWaitModal.types';

const TransactionWaitModal = ({
	onDismiss,
	fromToken,
	toToken,
	transactionHash,
	deposit = false,
	withdraw = false,
	sent = false
}: TransactionWaitModalProps) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const [mined, setMined] = useState(false);

	const openTransaction = async () => {
		const { etherscanURL } = await network();
		Linking.openURL(`${etherscanURL}/tx/${transactionHash}`);
	};

	useEffect(() => {
		const fetchStatus = async () => {
			if (transactionHash) {
				const provider = await getProvider();
				await provider.waitForTransaction(transactionHash);
				setMined(true);
			} else {
				setMined(false);
			}
		};

		fetchStatus();
	}, [transactionHash]);
	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.modalRow}>
				<View style={toToken ? { marginRight: 56 } : {}}>
					<Token name={fromToken.symbol.toLowerCase() as TokenType} size={50} />
				</View>
				{!!toToken && (
					<>
						<View style={styles.exchangeResumeBackground}>
							<Icon name="arrowRight" color="cta1" size={24} />
						</View>
						<Token name={toToken.symbol.toLowerCase() as TokenType} size={50} />
					</>
				)}
			</View>
			<View style={styles.modalColumn}>
				<Text type="h3" weight="extraBold" color="text1">
					{mined ? 'Transaction done' : 'Processing Transaction'}
				</Text>
			</View>
			<View style={styles.modalRow}>
				<Text type="p2" weight="medium" color="text3">
					{mined
						? sent
							? 'Sent'
							: deposit
							? 'Deposited'
							: withdraw
							? 'Withdrew'
							: 'Exchanged'
						: sent
						? 'Sending'
						: deposit
						? 'Depositing'
						: withdraw
						? 'Withdrawing'
						: 'Exchanging'}{' '}
				</Text>
				<Text type="p2" weight="extraBold" color="text3">
					{' '}
					{fromToken.symbol}
				</Text>
				{!withdraw && (
					<>
						<Text type="p2" weight="medium" color="text3">
							{' '}
							{sent ? '' : deposit ? 'in' : 'for'}{' '}
						</Text>
						{!!toToken && (
							<Text type="p2" weight="extraBold" color="text3">
								{' '}
								{toToken.symbol}
							</Text>
						)}
					</>
				)}
			</View>
			<View style={styles.modalRow}>
				<Text type="a" weight="medium" color="text3">
					Transaction:
				</Text>
				<Button mode="text" onPress={openTransaction}>
					<Text type="a" weight="medium" color="text3">
						{transactionHash && smallWalletAddress(transactionHash)} {!mined && <ActivityIndicator />}
					</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
};

export default TransactionWaitModal;
