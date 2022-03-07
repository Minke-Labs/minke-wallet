import React, { useCallback } from 'react';
import { View, Image } from 'react-native';
import { useState } from '@hookstate/core';
import { WelcomeLayout } from '@layouts';
import { welcomeImg } from '@images';
import { walletCreate } from '@models/wallet';
import { ActivityIndicator, Text, Button, Modal } from '@components';
import { useNavigation } from '@hooks';
import { globalWalletState, walletState } from '@stores/WalletStore';
import styles from './WelcomeScreen.styles';
import ImportWalletModal from './ImportWalletModal/ImportWalletModal';
import { Background } from './Background/Background';

const WelcomeScreen = () => {
	const navigation = useNavigation();
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
						<Image source={welcomeImg} style={styles.headerImage} />

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
							{!loading && (
								<Button title="Import Wallet" mode="text" onPress={() => setModalVisible(true)} />
							)}
						</View>
					</View>
				</Background>
			</WelcomeLayout>

			<Modal isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				<ImportWalletModal onImportFinished={onImportFinished} onDismiss={() => setModalVisible(false)} />
			</Modal>
		</>
	);
};

export default WelcomeScreen;
