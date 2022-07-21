import React, { useState } from 'react';
import { View } from 'react-native';
import { SettingsHeader, CountrySelector, Text } from '@components';
import { BasicLayout } from '@layouts';
import { Snackbar } from 'react-native-paper';
import { useNavigation, useLanguage, useCountry } from '@hooks';
import RNUxcam from 'react-native-ux-cam';

const ChangeCountryScreen = () => {
	const { i18n } = useLanguage();
	const { country } = useCountry();
	const navigation = useNavigation();
	const [snackbarVisible, setSnackbarVisible] = useState(false);

	RNUxcam.tagScreenName('ChangeCountryScreen');

	const handlePress = () => {
		if (!country) setSnackbarVisible(true);
		else navigation.navigate('WalletScreen');
	};

	return (
		<>
			<BasicLayout>
				<View style={{ flex: 1 }}>
					<SettingsHeader
						title={i18n.t('ChangeCountryScreen.header_title')}
						onPress={handlePress}
					/>
					<View style={{ paddingHorizontal: 16, flex: 1, marginTop: 16 }}>
						<CountrySelector desc />
					</View>
				</View>
			</BasicLayout>
			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text color="text11">{i18n.t('Components.CountrySelector.select')}</Text>
			</Snackbar>
		</>
	);
};

export default ChangeCountryScreen;
