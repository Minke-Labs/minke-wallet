import React from 'react';
import { View } from 'react-native';
import { SettingsHeader, CountrySelector } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation, useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';

const ChangeCountryScreen = () => {
	const { i18n } = useLanguage();
	RNUxcam.tagScreenName('ChangeCountryScreen');

	const navigation = useNavigation();
	const goBack = () => navigation.goBack();

	return (
		<BasicLayout>
			<View style={{ flex: 1 }}>
				<SettingsHeader title={i18n.t('ChangeCountryScreen.header_title')} onPress={goBack} />
				<View style={{ paddingHorizontal: 16, flex: 1, marginTop: 16 }}>
					<CountrySelector />
				</View>
			</View>
		</BasicLayout>
	);
};

export default ChangeCountryScreen;
