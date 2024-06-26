import React, { useState } from 'react';
import { View } from 'react-native';
import { Header, CountrySelector, Snackbar } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation, useLanguage, useCountry } from '@hooks';
import RNUxcam from 'react-native-ux-cam';

const ChangeCountryScreen = () => {
	RNUxcam.tagScreenName('ChangeCountryScreen');
	const { i18n } = useLanguage();
	const { country } = useCountry();
	const navigation = useNavigation();
	const [snackbarVisible, setSnackbarVisible] = useState(false);

	const handlePress = () => {
		if (!country) setSnackbarVisible(true);
		else navigation.navigate('HomeScreen');
	};

	return (
		<>
			<BasicLayout>
				<View style={{ flex: 1 }}>
					<Header title={i18n.t('ChangeCountryScreen.header_title')} done onRightActionClick={handlePress} />
					<View style={{ paddingHorizontal: 16, flex: 1, marginTop: 16 }}>
						<CountrySelector desc />
					</View>
				</View>
			</BasicLayout>
			<Snackbar
				onDismiss={() => setSnackbarVisible(false)}
				visible={snackbarVisible}
				title={i18n.t('Components.Snackbar.select')}
			/>
		</>
	);
};

export default ChangeCountryScreen;
