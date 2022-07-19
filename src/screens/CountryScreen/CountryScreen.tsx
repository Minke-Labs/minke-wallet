import React, { useState } from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { CountrySelector, SettingsHeader, Text } from '@components';
import { BasicLayout } from '@layouts';
import { useCountry, useLanguage, useNavigation } from '@hooks';

const CountryScreen = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const { country } = useCountry();
	const [snackbarVisible, setSnackbarVisible] = useState(false);

	const handlePress = () => {
		if (!country) setSnackbarVisible(true);
		else navigation.navigate('WalletScreen');
	};

	return (
		<>
			<BasicLayout>
				<SettingsHeader
					title={i18n.t('Components.CountrySelector.country')}
					onPress={handlePress}
				/>
				<View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
					<CountrySelector desc />
				</View>
			</BasicLayout>
			<Snackbar duration={2000} onDismiss={() => setSnackbarVisible(false)} visible={snackbarVisible}>
				<Text color="text11">{i18n.t('Components.CountrySelector.select')}</Text>
			</Snackbar>
		</>
	);
};

export default CountryScreen;
