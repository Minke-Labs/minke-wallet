import React from 'react';
import { Image } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { welcomeImg } from '@images';
import { Text, Button, LoadingScreen, Icon, Touchable, View } from '@components';
import { useGlobalWalletState, useLanguage, useNavigation } from '@hooks';
import { Background } from './Background/Background';
import { useWelcomeScreen } from './WelcomeScreen.hooks';
import useEnterReferralCodeScreen from '../EnterReferralCodeScreen/EnterReferralCodeScreen.hooks';
import styles from './WelcomeScreen.styles';
import { useBackupSettingsScreen } from '../BackupSettingsScreen/BackupSettingsScreen.hooks';

const WelcomeScreen = () => {
	RNUxcam.tagScreenName('WelcomeScreen');
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { walletId } = useGlobalWalletState();

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
						<Button
							title={i18n.t('WelcomeScreen.view_backups')}
							mb="xs"
							onPress={() => navigation.navigate('BackupSettingsScreen')}
						/>

						{!!walletId && (
							<Touchable onPress={() => navigation.navigate('HomeScreen')}>
								<Text type="a" weight="semiBold" color="cta1">
									{i18n.t('WelcomeScreen.go_to_wallet')}
								</Text>
							</Touchable>
						)}
					</View>
				</View>
			</Background>
		</BasicLayout>
	);
};

export default WelcomeScreen;
