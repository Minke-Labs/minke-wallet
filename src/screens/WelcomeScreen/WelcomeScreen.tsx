import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { BasicLayout } from '@layouts';
import { welcomeImg } from '@images';
import { Text, Button, Modal, LoadingScreen } from '@components';
import { useLanguage, useNavigation } from '@hooks';
import styles from './WelcomeScreen.styles';
import ImportWalletModal from './ImportWalletModal/ImportWalletModal';
import { Background } from './Background/Background';
import { useWelcomeScreen } from './WelcomeScreen.hooks';

const WelcomeScreen = () => {
	const { i18n } = useLanguage();
	const { isModalVisible, setModalVisible, onImportFinished, onCreateWallet, loading } = useWelcomeScreen();
	const navigation = useNavigation();

	return (
		<>
			<BasicLayout>
				<Background>
					<View style={styles.container}>
						<Image source={welcomeImg} style={styles.headerImage} />

						<View style={styles.textContainer}>
							<Text center weight="extraBold" type="h1" width={273} marginBottom={16}>
								{i18n.t('WelcomeScreen.wave_goodbye')}
							</Text>
							<Text center color="text2" width={198}>
								{i18n.t('WelcomeScreen.easily')} <Text weight="extraBold">Minke</Text>
							</Text>
						</View>

						<View style={styles.buttonContainer}>
							{loading ? (
								<LoadingScreen title={i18n.t('WelcomeScreen.creating')} />
							) : (
								<Button
									title={i18n.t('WelcomeScreen.create')}
									onPress={onCreateWallet}
									marginBottom={16}
								/>
							)}
							{!loading && (
								<>
									<Button
										title={i18n.t('WelcomeScreen.import_or_restore')}
										mode="outlined"
										onPress={() => setModalVisible(true)}
										marginBottom={16}
									/>
									<TouchableOpacity onPress={() => navigation.navigate('EnterReferralCodeScreen')}>
										<Text type="a" weight="semiBold" color="cta1">
											{i18n.t('WelcomeScreen.i_have_a_referral_code')}
										</Text>
									</TouchableOpacity>
								</>
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
