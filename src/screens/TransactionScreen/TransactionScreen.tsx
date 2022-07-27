import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Header, Text, Paper, TransactionIcon, Icon, Button, Token } from '@components';
import { BasicLayout } from '@layouts';
import { useLanguage, useTransaction } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { networks } from '@models/network';
import { Snackbar } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { smallWalletAddress } from '@models/wallet';
import { TokenType } from '@styles';
import { truncate } from '@src/hooks/useTransaction';
import styles from './TransactionScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionScreen'>;
const TransactionScreen = ({ route }: Props) => {
	const { transaction } = route.params;
	const { i18n } = useLanguage();
	const { network } = useState(globalWalletState()).value;
	const explorer = network.id === networks.matic.id ? 'PolygonScan' : 'EtherScan';
	const [snackbarVisible, setSnackbarVisible] = React.useState(false);

	const {
		received,
		failed,
		pending,
		topUp,
		exchange,
		deposit,
		withdraw,
		date,
		description,
		source,
		formattedSource,
		value,
		token,
		sourceToken,
		toToken,
		fromAmount,
		hash,
		protocol,
		openTransaction
	} = useTransaction({
		transaction,
		walletDigits: 12
	});

	const onCopyToClipboard = () => {
		Clipboard.setString(source);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSnackbarVisible(true);
	};

	const onCopyHashToClipboard = () => {
		Clipboard.setString(hash);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setSnackbarVisible(true);
	};

	return (
		<>
			<BasicLayout>
				<Header title={description} />
				<View style={styles.container}>
					<View style={styles.titleRow}>
						<Text color="text1" type="dMedium" weight="bold">
							{received || topUp || exchange || withdraw ? '+' : '-'}
							{value}
						</Text>
						<View style={styles.titleText}>
							<Token name={token.toLowerCase() as TokenType} size={32} glow />
						</View>
						<Text color="text1" type="dMedium" weight="bold" style={styles.titleText}>
							{token}
						</Text>
					</View>
				</View>
				<View style={styles.panel}>
					<Paper padding={24}>
						<View style={styles.row}>
							<Text color="text1" type="tSmall" weight="semiBold">
								{i18n.t('TransactionScreen.transaction_type')}
							</Text>
							<Text color="text1" type="tSmall" weight="semiBold">
								{i18n.t('TransactionScreen.date')}
							</Text>
						</View>
						<View style={styles.row}>
							<View style={styles.row}>
								<TransactionIcon
									{...{ received, failed, pending, topUp, exchange, deposit, withdraw }}
									size={20}
									arrowSize={10}
								/>
								<Text color="text1" type="lLarge" weight="regular" style={styles.description}>
									{description}
								</Text>
							</View>
							<Text color="text1" type="lLarge" weight="regular">
								{date}
							</Text>
						</View>
					</Paper>
				</View>
				<Paper padding={24}>
					<>
						<Text color="text1" type="tSmall" weight="semiBold">
							{i18n.t('TransactionScreen.hash')}
						</Text>
						<View style={[styles.row, styles.data]}>
							<Text color="text1" type="lLarge" weight="regular" width={242}>
								{smallWalletAddress(hash, 12)}
							</Text>
							<TouchableOpacity onPress={onCopyHashToClipboard}>
								<Icon name="copy" size={24} color="text7" />
							</TouchableOpacity>
						</View>
					</>
					{deposit || withdraw ? (
						<>
							<Text color="text1" type="tSmall" weight="semiBold">
								{i18n.t('TransactionScreen.savings_account')}
							</Text>
							<View style={[styles.titleRow, styles.data]}>
								<Token name={protocol.toLowerCase() as TokenType} size={16} />
								<Text color="text1" type="lLarge" weight="regular" style={styles.description}>
									{protocol}
								</Text>
							</View>
						</>
					) : exchange && toToken && sourceToken ? (
						<>
							<Text color="text1" type="tSmall" weight="semiBold">
								{i18n.t('TransactionScreen.exchanged')}
							</Text>
							<View style={[styles.row, styles.data]}>
								<Text color="text1" type="lLarge" weight="regular">
									{i18n.t('TransactionScreen.exchange_details', {
										from: sourceToken.symbol,
										fromAmount,
										toAmount: value,
										to: toToken.symbol
									})}
								</Text>
							</View>
							<Text color="text1" type="tSmall" weight="semiBold">
								{i18n.t('TransactionScreen.exchange_rate')}
							</Text>
							<View style={[styles.row, styles.data]}>
								<Text color="text1" type="lLarge" weight="regular">
									1 {sourceToken.symbol} = {truncate(toToken.amount / sourceToken.amount, 6)}{' '}
									{toToken.symbol}
								</Text>
							</View>
						</>
					) : (
						<>
							<Text color="text1" type="tSmall" weight="semiBold">
								{received
									? i18n.t('TransactionScreen.received_from')
									: i18n.t('TransactionScreen.sent_to')}
							</Text>
							<View style={styles.row}>
								<Text color="text1" type="lLarge" weight="regular" width={242}>
									{formattedSource}
								</Text>
								<TouchableOpacity onPress={onCopyToClipboard}>
									<Icon name="copy" size={24} color="text7" />
								</TouchableOpacity>
							</View>
						</>
					)}
				</Paper>

				<View style={styles.button}>
					<Button
						mode="outlined"
						title={`${i18n.t('Components.Transaction.view_on')} ${explorer}`}
						onPress={openTransaction}
					/>
				</View>
			</BasicLayout>
			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text color="text11">{i18n.t('WalletScreen.ModalsImport.address_copied')}</Text>
			</Snackbar>
		</>
	);
};

export default TransactionScreen;
