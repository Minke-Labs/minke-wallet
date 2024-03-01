import React from 'react';
import { Image } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { welcomeImg } from '@images';
import { Text, Button, LoadingScreen, Touchable, View } from '@components';
import { useGlobalWalletState, useLanguage, useNavigation } from '@hooks';
import { Background } from './Background/Background';
import { useWelcomeScreen } from './WelcomeScreen.hooks';
import styles from './WelcomeScreen.styles';

const WelcomeScreen = () => {
	RNUxcam.tagScreenName('WelcomeScreen');
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { walletId } = useGlobalWalletState();
	const { onCreateWallet, loading } = useWelcomeScreen();

	return (
		<BasicLayout>
			<Background>
				<View style={styles.container}>
					<Image source={welcomeImg} style={styles.headerImage} />

					<View style={styles.textContainer}>
						<Text center weight="extraBold" type="hLarge" marginBottom={16}>
							{i18n.t('WelcomeScreen.wave_goodbye')}
						</Text>
						<Text center color="text2" type="bMedium" width={250}>
							{i18n.t('WelcomeScreen.easily')}
						</Text>
					</View>

					<View style={styles.buttonContainer}>
						{loading ? (
							<LoadingScreen title={i18n.t('WelcomeScreen.creating')} />
						) : (
							<>
								<Button
									title={i18n.t('WelcomeScreen.view_backups')}
									mb="xs"
									onPress={() => navigation.navigate('BackupSettingsScreen')}
								/>

								{!!walletId ? (
									<Touchable onPress={() => navigation.navigate('HomeScreen')}>
										<Text type="a" weight="semiBold" color="cta1">
											{i18n.t('WelcomeScreen.go_to_wallet')}
										</Text>
									</Touchable>
								) : (
									<Touchable onPress={onCreateWallet}>
										<Text type="a" weight="semiBold" color="cta1">
											{i18n.t('WelcomeScreen.create')}
										</Text>
									</Touchable>
								)}
							</>
						)}
					</View>
				</View>
			</Background>
		</BasicLayout>
	);
};

export default WelcomeScreen;
