import React from 'react';
import { Paper, Text, View, Button } from '@components';
import { useCountry, useLanguage, useNavigation } from '@hooks';
import APay from './APay';
import Debit from './Debit';
import { chooseLocation } from './chooseLocation';

export const AccountsEmpty: React.FC = () => {
	const { i18n } = useLanguage();
	const { countryCode } = useCountry();
	const navigation = useNavigation();
	const localPayment = chooseLocation(countryCode);
	return (
		<Paper p="xs" mb="xs">
			<Text type="tSmall" weight="bold" color="cta1" mb="xs">
				{i18n.t('HomeScreen.Accounts.AccountsEmpty.buy_usdc_now')}
			</Text>
			<Text type="lSmall" weight="semiBold" mb="xs">
				{i18n.t('HomeScreen.Accounts.AccountsEmpty.purchase')}
			</Text>
			<View mb="s" row cross="center">
				<APay />
				<View mr="xs" />
				<Debit />
				<View mr="xs" />
				{localPayment}
			</View>
			<Button
				title={i18n.t('Components.Buttons.buy_usdc_now')}
				mode="outlined"
				onPress={() => navigation.navigate('AddFundsScreen')}
			/>
		</Paper>
	);
};
