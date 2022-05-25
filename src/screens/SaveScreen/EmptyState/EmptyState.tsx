/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, ImageBackground, TouchableOpacity, useColorScheme, SafeAreaView } from 'react-native';
import { Icon, Text, Button } from '@components';
import { useTheme, useNavigation, useDepositProtocols, useLanguage } from '@hooks';
import { LinearGradient } from 'expo-linear-gradient';
import { bgSaveBackground, bgSaveBackgroundDark, mStableSaveBackground } from '@images';
import { makeStyles } from './EmptyState.styles';

const EmptyState = () => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const scheme = useColorScheme();
	const navigation = useNavigation();
	const { selectedProtocol, apy } = useDepositProtocols();
	const aaveBg = scheme === 'dark' ? bgSaveBackgroundDark : bgSaveBackground;
	const backgroundImg = selectedProtocol?.id === 'aave' ? aaveBg : mStableSaveBackground;

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<ImageBackground source={backgroundImg} style={styles.bgSaveEmptyScreen} />
			</SafeAreaView>

			<View style={styles.headerNavigation}>
				<TouchableOpacity style={styles.headerNavigationLeft} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
					<Text weight="extraBold" type="h3" color="text1" style={{ marginLeft: 12 }}>
						{i18n.t('SaveScreen.EmptyState.save')}
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.saveEmptyStateContent}>
				<View style={styles.saveEmptyStateCard}>
					<Text type="h3" weight="extraBold" color="text1" marginBottom={16} center>
						{i18n.t('SaveScreen.EmptyState.open_aave_savings_account', {
							protocol: selectedProtocol?.name
						})}
					</Text>

					<Text type="p2" color="text3" marginBottom={32}>
						{i18n.t('SaveScreen.EmptyState.lets_make_first_deposit')}
					</Text>

					{!!apy && (
						<View style={styles.linearGradientContainer}>
							<LinearGradient
								start={{ x: 0, y: 0.75 }}
								end={{ x: 1, y: 0.25 }}
								colors={['#30C061', '#30C08C']}
								style={styles.linearGradient}
							>
								<Icon name="iconUp" color="text11" size={16} style={styles.greenButtonIcon} />
								<Text weight="bold" type="a" color="text11" style={{ lineHeight: 25 }}>
									{apy}
									{i18n.t('SaveScreen.interest')}
								</Text>
							</LinearGradient>
						</View>
					)}

					<View style={{ marginTop: 'auto', width: '100%', marginBottom: 58 }}>
						<Button
							iconLeft="addStroke"
							title={i18n.t('Components.Buttons.deposit')}
							onPress={() => navigation.navigate('DepositScreen')}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default EmptyState;
