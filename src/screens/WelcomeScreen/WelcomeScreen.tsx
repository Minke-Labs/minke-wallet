import React from 'react';
import { Image, Linking, useColorScheme } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { welcomeImg, welcomeImgDark } from '@images';
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
	const { onCreateWallet, onImportWallet, loading } = useWelcomeScreen();
	const scheme = useColorScheme();
	return (
		<BasicLayout>
			<Background>
				<View style={styles.container}>
					<Image source={scheme === 'dark' ? welcomeImgDark : welcomeImg} style={styles.headerImage} />

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
									title={i18n.t('WelcomeScreen.download_zengo')}
									mb="xs"
									onPress={() => Linking.openURL('https://go.zengo.com/uCxL/dgur0o9n')}
								/>

								{walletId ? (
									<Button
										title={i18n.t('WelcomeScreen.go_to_wallet')}
										mb="xs"
										mode="outlined"
										onPress={() => navigation.navigate('HomeScreen')}
									/>
								) : (
									<Button
										title={i18n.t('WelcomeScreen.create')}
										mb="xs"
										mode="outlined"
										onPress={onCreateWallet}
									/>

								)}

								<Button
									title={i18n.t('ImportWalletScreen.import_wallet')}
									mb="xs"
									mode="outlined"
									onPress={onImportWallet}
								/>

							</>
						)}
					</View>
				</View>
			</Background>
		</BasicLayout>
	);
};

export default WelcomeScreen;
