import React from 'react';
import { Image } from 'react-native';
import { whale2Img } from '@images';
import { useLanguage, useNavigation } from '@hooks';
import View from '@src/components/View/View';
import Text from '@src/components/Text/Text';
import Button from '@src/components/Button/Button';

const NoTransactions = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	return (
		<View flex1 main="center" cross="center" pv="xs" ph="s">
			<Image source={whale2Img} style={{ width: 152, height: 152 }} />
			<View cross="center" mt="xs" mb="xl">
				<Text type="tSmall" weight="bold" mb="xxs">
					{i18n.t('Components.EmptyStates.NoTransactions.your_transactions')}
				</Text>
				<Text type="bMedium">
					{i18n.t('Components.EmptyStates.NoTransactions.lets_get_started')}
				</Text>
			</View>
			<Button
				iconLeft="add"
				title={i18n.t('Components.EmptyStates.NoTransactions.add_funds')}
				onPress={() => navigation.navigate('AddFundsScreen', {})}
			/>
		</View>
	);
};

export default NoTransactions;
