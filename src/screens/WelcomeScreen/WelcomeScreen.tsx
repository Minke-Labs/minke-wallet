import React from 'react';
import { View, Image } from 'react-native';
import { BasicLayout } from '@layouts';
import { welcomeImg } from '@images';
import { Text, Button, Modal, LoadingScreen } from '@components';
import i18n from '@localization';
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
								{i18n.t('welcomeScreen.wave_goodbye')}
							</Text>
							<Text center color="text2" width={198}>
								{i18n.t('welcomeScreen.easily')}
								<Text weight="extraBold">Minke</Text>
							</Text>
						</View>

						<View style={styles.buttonContainer}>
							{loading ? (
								<LoadingScreen title={i18n.t('welcomeScreen.creating')} />
							) : (
								<Button
									title={i18n.t('welcomeScreen.create')}
									onPress={onCreateWallet}
									marginBottom={14}
								/>
							)}
							{!loading && (
								<Button
									title={i18n.t('welcomeScreen.import_or_restore')}
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
