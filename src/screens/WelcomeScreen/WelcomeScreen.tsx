import React, { useCallback } from 'react';
import { View, Image, useColorScheme } from 'react-native';
import { useState } from '@hookstate/core';
import { WelcomeLayout } from '@layouts';
import {
	welcomeImg,
	waveWelcomeHeaderImg,
	waveWelcomeHeaderDarkImg,
	waveWelcomeFooterImg,
	waveWelcomeFooterDarkImg
} from '@images';
import { walletCreate } from '@models/wallet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Button, Modal } from '@components';
import { useNavigation } from '@react-navigation/native';
import { globalWalletState, walletState } from '@stores/WalletStore';
import { ActivityIndicator } from 'react-native-paper';
import { RootStackParamList } from '../../routes/types.routes';
import styles from './WelcomeScreen.styles';
import ImportFlow from './ImportFlow';

const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	return (
		<View style={styles.backgroundContainer}>
			<Image
				source={scheme === 'dark' ? waveWelcomeHeaderDarkImg : waveWelcomeHeaderImg}
				style={styles.backgroundTop}
			/>
			<Image
				source={scheme === 'dark' ? waveWelcomeFooterDarkImg : waveWelcomeFooterImg}
				style={styles.backgroundBottom}
			/>
			{children}
		</View>
	);
};

const WelcomeScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const [isModalVisible, setModalVisible] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const state = useState(globalWalletState());

	const onImportFinished = () => {
		setModalVisible(false);
		navigation.navigate('WalletCreated');
	};

	const onCreateWallet = useCallback(async () => {
		setLoading(true);
		const newWallet = await walletCreate();
		state.set(await walletState(newWallet));
		setLoading(false);
		navigation.navigate('WalletCreated');
	}, [navigation]);

	return (
		<>
			<WelcomeLayout>
				<Background>
					<View style={styles.container}>
						<View style={{ width: '100%' }}>
							<Image source={welcomeImg} style={styles.headerImage} />
						</View>

						<View style={styles.textContainer}>
							<Text center weight="extraBold" type="h1" width={273} marginBottom={16}>
								Wave goodbye to your bank!
							</Text>
							<Text center color="text2" width={198}>
								Easily save, spend and invest with
								<Text weight="extraBold"> Minke </Text>
							</Text>
						</View>

						<View style={styles.buttonContainer}>
							{loading ? (
								<ActivityIndicator />
							) : (
								<Button title="Create Wallet" onPress={onCreateWallet} marginBottom={14} />
							)}
							<Button title="Import Wallet" mode="text" onPress={() => setModalVisible(true)} />
						</View>
					</View>
				</Background>
			</WelcomeLayout>

			<Modal isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				<ImportFlow onImportFinished={onImportFinished} onDismiss={() => setModalVisible(false)} />
			</Modal>
		</>
	);
};

export default WelcomeScreen;
