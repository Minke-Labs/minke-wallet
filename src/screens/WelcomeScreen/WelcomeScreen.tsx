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

const WelcomeScreen = () => {
	RNUxcam.tagScreenName('WelcomeScreen');
	const { i18n } = useLanguage();
	const { onCreateWallet, onImportWallet, loading } = useWelcomeScreen();
	const navigation = useNavigation();
	const { disableCode } = useEnterReferralCodeScreen();
	const { address } = useGlobalWalletState();

	return (
		<BasicLayout>
			<Background>
				<View style={styles.container}>
					<Image source={welcomeImg} style={styles.headerImage} />

					<View style={styles.textContainer}>
						<Text center weight="extraBold" type="hLarge" marginBottom={16}>
							{i18n.t('WelcomeScreen.wave_goodbye')}
						</Text>
						<Text center color="text2" type="bMedium" width={198}>
							{i18n.t('WelcomeScreen.easily')}
						</Text>
					</View>

					<View style={styles.buttonContainer}>
						{loading ? (
							<LoadingScreen title={i18n.t('WelcomeScreen.creating')} />
						) : (
							<Button title={i18n.t('WelcomeScreen.create')} onPress={onCreateWallet} mb="xs" />
						)}
						{!loading && (
							<>
								<Button
									title={i18n.t('WelcomeScreen.import_or_restore')}
									mode="outlined"
									onPress={onImportWallet}
									mb="xs"
								/>
								{disableCode ? (
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<Text type="a" weight="medium" center color="alert3">
											{i18n.t('WelcomeScreen.referral_code_applied')}
										</Text>
										<Icon name="checkmark" color="cta1" size={20} style={{ marginLeft: 8 }} />
									</View>
								) : (
									!!address && (
										<Touchable
											onPress={() => navigation.navigate('EnterReferralCodeScreen')}
										>
											<Text type="a" weight="semiBold" color="cta1">
												{i18n.t('WelcomeScreen.i_have_a_referral_code')}
											</Text>
										</Touchable>
									)
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
