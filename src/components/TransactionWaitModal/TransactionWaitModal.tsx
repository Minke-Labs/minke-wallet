import React from 'react';
import { View, Image, Linking, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import { useTheme } from '@hooks';
import { ParaswapToken } from '@models/token';
import { network } from '@models/network';
import { smallWalletAddress } from '@src/model/wallet';
import { ModalHeader, Text, Icon } from '@components';
import { makeStyles } from './TransactionWaitModal.styles';

const TransactionWaitModal = ({
	onDismiss,
	fromToken,
	toToken,
	transactionHash
}: {
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
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.modalRow}>
				<Image source={{ uri: fromToken.img }} style={{ width: 50, height: 50, marginRight: 56 }} />
				<View style={styles.exchangeResumeBackground}>
					<Icon name="arrowRight" color="cta1" size={24} />
				</View>
				<Image source={{ uri: toToken.img }} style={{ width: 50, height: 50 }} />
			</View>
			<View style={styles.modalColumn}>
				<Text type="h3" weight="extraBold" color="text1">
					Processing Transaction
				</Text>
			</View>
			<View style={styles.modalRow}>
				<Text type="p2" weight="medium" color="text3">
					Exchanging{' '}
				</Text>
				<Text type="p2" weight="extraBold" color="text3">
					{' '}
					{fromToken.symbol}
				</Text>
				<Text type="p2" weight="medium" color="text3">
					{' '}
					for{' '}
				</Text>
				<Text type="p2" weight="extraBold" color="text3">
					{' '}
					{toToken.symbol}
				</Text>
			</View>
			<View style={styles.modalRow}>
				<Text type="a" weight="medium" color="text3">
					Transaction:
				</Text>
				<Button mode="text" onPress={openTransaction}>
					<Text type="a" weight="medium" color="text3">
						{smallWalletAddress(transactionHash)}
					</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
};

export default TransactionWaitModal;
