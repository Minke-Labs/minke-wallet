import React from 'react';
import { View } from 'react-native';
import { SettingsHeader } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { FlagType } from '@styles';
import { ItemCurrency } from './ItemCurrency/ItemCurrency';
import { currencies } from './ChangeCurrencyScreen.utils';

const ChangeCurrencyScreen = () => {
	const navigation = useNavigation();
	const goBack = () => navigation.goBack();

	return (
		<BasicLayout>
			<SettingsHeader title="Change Currency" onPress={goBack} />
			<View style={{ height: 20 }} />
			<ItemCurrency flag={currencies[0].flag as FlagType} currencyName={currencies[0].currencyName} />
		</BasicLayout>
	);
};

export default ChangeCurrencyScreen;
