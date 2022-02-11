import React from 'react';
import { View, Image, Linking } from 'react-native';
import { Headline, Button, Text, useTheme } from 'react-native-paper';
import { ParaswapToken } from '@src/model/token';
import { network } from '@src/model/network';
import { Svg, Path } from 'react-native-svg';
import { smallWalletAddress } from '@src/model/wallet';
import Modal from '../Modal';
import { makeStyles } from './TransactionWaitModal.styles';
import globalStyles from '../global.styles';

const TransactionWaitModal = ({
	visible,
	onDismiss,
	fromToken,
	toToken,
	transactionHash
}: {
	visible: boolean;
	onDismiss: () => void;
	fromToken: ParaswapToken;
	toToken: ParaswapToken;
	transactionHash: string;
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const openTransaction = async () => {
		const { etherscanURL } = await network();
		Linking.openURL(`${etherscanURL}/tx/${transactionHash}`);
	};

	return (
		<Modal visible={visible} onDismiss={onDismiss} onCloseAll={onDismiss}>
			<>
				<View style={styles.modalRow}>
					<Image source={{ uri: fromToken.img }} style={{ width: 50, height: 50, marginRight: 56 }} />
					<View style={styles.exchangeResumeBackground}>
						<Svg width="24" height="24" viewBox="0 0 24 24" fill={colors.primary}>
							<Path
								fill-rule="evenodd"
								clip-rule="evenodd"
								// eslint-disable-next-line max-len
								d="M19.6601 13.0178C20.1602 12.5277 20.1602 11.7224 19.6601 11.2322L15.0498 6.71421C14.6554 6.32765 14.649 5.69452 15.0356 5.30007C15.4221 4.90562 16.0552 4.89923 16.4497 5.28579L21.0599 9.80381C22.3602 11.0781 22.3602 13.1719 21.0599 14.4462L16.4497 18.9642C16.0552 19.3508 15.4221 19.3444 15.0356 18.9499C14.649 18.5555 14.6554 17.9224 15.0498 17.5358L19.6601 13.0178Z"
								fill={colors.primary}
							/>
							<Path
								fill-rule="evenodd"
								clip-rule="evenodd"
								// eslint-disable-next-line max-len
								d="M22 12.125C22 12.6773 21.5523 13.125 21 13.125L8.5 13.125C7.94771 13.125 7.5 12.6773 7.5 12.125C7.5 11.5727 7.94771 11.125 8.5 11.125L21 11.125C21.5523 11.125 22 11.5727 22 12.125ZM5.875 12.125C5.875 12.6773 5.42728 13.125 4.875 13.125L3.125 13.125C2.57271 13.125 2.125 12.6773 2.125 12.125C2.125 11.5727 2.57271 11.125 3.125 11.125L4.875 11.125C5.42728 11.125 5.875 11.5727 5.875 12.125Z"
								fill={colors.primary}
							/>
						</Svg>
					</View>
					<Image source={{ uri: toToken.img }} style={{ width: 50, height: 50 }} />
				</View>
				<View style={styles.modalColumn}>
					<Headline style={globalStyles.headline}>Processing Transaction</Headline>
				</View>
				<View style={styles.modalRow}>
					<Text>Exchanging </Text>
					<Text style={globalStyles.fontBold}> {fromToken.symbol}</Text>
					<Text> for </Text>
					<Text style={globalStyles.fontBold}> {toToken.symbol}</Text>
				</View>
				<View style={styles.modalRow}>
					<Text>Transaction:</Text>
					<Button mode="text" onPress={openTransaction}>
						{smallWalletAddress(transactionHash)}
					</Button>
				</View>
			</>
		</Modal>
	);
};

export default TransactionWaitModal;
