import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { network } from '@src/model/network';
import { TokenType } from '@styles';
import { Text, Token, Icon } from '@components';
import * as Linking from 'expo-linking';
import { smallWalletAddress } from '@src/model/wallet';
import { SentModalProps } from './types';
import styles from './styles';

const SentModal: React.FC<SentModalProps> = ({ sentObj, onDismiss }) => {
	const openTransaction = async () => {
		const { etherscanURL } = await network();
		Linking.openURL(`${etherscanURL}/tx/${sentObj?.link}`);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.iconContainer}>
				<TouchableOpacity onPress={onDismiss} activeOpacity={0.8}>
					<Icon name="closeStroke" size={24} color="text7" />
				</TouchableOpacity>
			</View>
			<Text type="h3" weight="extraBold" color="text1" marginBottom={12}>
				Token Sent
			</Text>
			<Token name={sentObj?.symbol as TokenType} size={60} />
			<Text weight="extraBold" color="text1" marginBottom={12 + 8} style={{ marginTop: 12 }}>
				{(sentObj?.symbol || '').toUpperCase()}
			</Text>
			<Text type="p2" weight="medium" color="text3" marginBottom={12}>
				Link of transaction:
			</Text>
			<TouchableOpacity onPress={openTransaction} style={{ marginBottom: 8 }}>
				<Text type="p2" weight="medium" color="text3" width={300} center>
					{smallWalletAddress(sentObj?.link || '')}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default SentModal;
