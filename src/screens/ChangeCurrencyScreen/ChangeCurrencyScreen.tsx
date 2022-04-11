import React from 'react';
import { SettingsHeader } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';

const ChangeCurrencyScreen = () => {
	const navigation = useNavigation();

	const goBack = () => navigation.goBack();

	return (
		<BasicLayout>
			<SettingsHeader title="Change Currency" onPress={goBack} />
		</BasicLayout>
	);
};

export default ChangeCurrencyScreen;
