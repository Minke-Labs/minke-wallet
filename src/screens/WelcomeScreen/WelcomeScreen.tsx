import React from 'react';
import { View, Image } from 'react-native';
import { BasicLayout } from '@layouts';
import { welcomeImg } from '@images';
import { Text, Button, Modal, LoadingScreen } from '@components';
import styles from './WelcomeScreen.styles';
import ImportWalletModal from './ImportWalletModal/ImportWalletModal';
import { Background } from './Background/Background';
import { useWelcomeScreen } from './WelcomeScreen.hooks';

const WelcomeScreen = () => {
	const { isModalVisible, setModalVisible, onImportFinished, onCreateWallet, loading } = useWelcomeScreen();
	return (
		<>
			<BasicLayout>
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
								<LoadingScreen title="Creating wallet" />
							) : (
								<Button title="Create Wallet" onPress={onCreateWallet} marginBottom={14} />
							)}
							{!loading && (
								<Button
									title="Import or Restore Wallet"
									mode="text"
									onPress={() => setModalVisible(true)}
								/>
							)}
						</View>
					</View>
				</Background>
			</BasicLayout>

			<Modal isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				<ImportWalletModal
					visible={isModalVisible}
					onImportFinished={onImportFinished}
					onDismiss={() => setModalVisible(false)}
				/>
			</Modal>
		</>
	);
};

export default WelcomeScreen;
