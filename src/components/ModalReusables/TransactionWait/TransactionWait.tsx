/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { View, Linking, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme, useLanguage } from '@hooks';
import { smallWalletAddress } from '@src/model/wallet';
import { networks } from '@models/network';
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

	const openTransaction = async () => {
		const network = Object.values(networks).find((n) => n.chainId === fromToken.chainId);
		const { etherscanURL } = network;
		Linking.openURL(`${etherscanURL}/tx/${transactionHash}`);
	};

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.modalRow}>
				<View style={toToken ? { marginRight: 56 } : {}}>
					<View>
						<Token token={fromToken} size={50} />
					</View>
				</View>
				{!!toToken && (
					<>
						<View style={styles.exchangeResumeBackground}>
							<Icon name="arrowRight" color="cta1" size={24} />
						</View>
						<View>
							<Token token={toToken} size={50} />
						</View>
					</>
				)}
			</View>
			<View style={styles.modalColumn}>
				<Text type="h3" weight="extraBold" color="text1">
					{i18n.t('Components.ModalReusables.TransactionWaitModal.processing_transaction')}
				</Text>
			</View>
			<View style={styles.modalRow}>
				<Text type="p2" weight="medium" color="text3">
					{sent
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
				{!!transactionHash && (
					<Button mode="text" onPress={openTransaction}>
						<Text type="a" weight="medium" color="text3">
							{smallWalletAddress(transactionHash)}
						</Text>
					</Button>
				)}
				<ActivityIndicator style={{ marginLeft: 8 }} />
			</View>
		</SafeAreaView>
	);
};

export default TransactionWaitModal;
