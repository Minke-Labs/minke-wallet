/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { View, Linking, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme, useLanguage } from '@hooks';
import { network } from '@models/network';
import { getProvider, smallWalletAddress } from '@src/model/wallet';
import { TokenType } from '@src/styles';
import ModalHeader from '../../ModalHeader/ModalHeader';
import { makeStyles } from './TransactionWait.styles';
import Token from '../../Token/Token';
import Icon from '../../Icon/Icon';
import ActivityIndicator from '../../ActivityIndicator/ActivityIndicator';
import Text from '../../Text/Text';
import { TransactionWaitModalProps } from './TransactionWait.types';

const TransactionWaitModal = ({
	onDismiss,
	fromToken,
	toToken,
	transactionHash,
	deposit = false,
	withdraw = false,
	sent = false
}: TransactionWaitModalProps) => {
	const { i18n } = useLanguage();
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
					{mined
						? i18n.t('Components.ModalReusables.TransactionWaitModal.transaction_done')
						: i18n.t('Components.ModalReusables.TransactionWaitModal.processing_transaction')}
				</Text>
			</View>
			<View style={styles.modalRow}>
				<Text type="p2" weight="medium" color="text3">
					{mined
						? sent
							? i18n.t('Components.ModalReusables.TransactionWaitModal.sent')
							: deposit
							? i18n.t('Components.ModalReusables.TransactionWaitModal.deposited')
							: withdraw
							? i18n.t('Components.ModalReusables.TransactionWaitModal.withdrew')
							: i18n.t('Components.ModalReusables.TransactionWaitModal.exchanged')
						: sent
						? i18n.t('Components.ModalReusables.TransactionWaitModal.sending')
						: deposit
						? i18n.t('Components.ModalReusables.TransactionWaitModal.depositing')
						: withdraw
						? i18n.t('Components.ModalReusables.TransactionWaitModal.withdrawing')
						: i18n.t('Components.ModalReusables.TransactionWaitModal.exchanging')}
				</Text>
				<Text type="p2" weight="extraBold" color="text3">
					{' '}
					{withdraw ? toToken?.symbol : fromToken.symbol}
				</Text>
				{!withdraw && (
					<>
						<Text type="p2" weight="medium" color="text3">
							{' '}
							{sent
								? ''
								: deposit
								? i18n.t('Components.ModalReusables.TransactionWaitModal.in')
								: i18n.t('Components.ModalReusables.TransactionWaitModal.for')}
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
					{i18n.t('Components.ModalReusables.TransactionWaitModal.transaction')}:
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