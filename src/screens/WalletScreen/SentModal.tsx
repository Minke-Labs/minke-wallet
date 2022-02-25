import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { network } from '@src/model/network';
import { TokenType } from '@styles';
import { Text, Token, Icon } from '@components';
import * as Linking from 'expo-linking';

type ResultProps = {
	link: string;
	symbol: string;
};

interface SentModalProps {
	sentObj: ResultProps | undefined;
	onDismiss: () => void;
}

const SentModal: React.FC<SentModalProps> = ({ sentObj, onDismiss }) => {
	const openTransaction = async () => {
		const { etherscanURL } = await network();
		Linking.openURL(`${etherscanURL}/tx/${sentObj?.link}`);
	};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				alignItems: 'center',
				paddingHorizontal: 32
			}}
		>
			<View
				style={{
					height: 64,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'flex-end',
					paddingHorizontal: 32,
					width: '100%'
				}}
			>
				<TouchableOpacity onPress={onDismiss} activeOpacity={0.8}>
					<Icon name="closeStroke" size={24} color="text7" />
				</TouchableOpacity>
			</View>
			<Text
				type="h3"
				weight="extraBold"
				color="text1"
				marginBottom={12}
				style={{ marginTop: 32 }}
			>
				Token Sent
			</Text>
			<Token name={sentObj?.symbol as TokenType} size={60} />
			<Text
				weight="extraBold"
				color="text1"
				marginBottom={12}
				style={{ marginTop: 12 }}
			>
				{sentObj?.symbol}
			</Text>
			<Text
				type="p2"
				weight="medium"
				color="text3"
				marginBottom={12}
				style={{ marginTop: 8 }}
			>
				Link of transaction:
			</Text>
			<TouchableOpacity onPress={openTransaction}>
				<Text type="p2" weight="medium" color="text3" width={300} center>
					{sentObj?.link}
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default SentModal;
