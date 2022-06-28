import React from 'react';
import { View } from 'react-native';
import { useLanguage } from '@hooks';
import { Text } from '@components';

export const Step0 = () => {
	const { i18n } = useLanguage();
	return (
		<>
			<View style={{ height: 25, flexDirection: 'row', marginBottom: 8 }}>
				<Text
					type="p" // Change to tMedium after new values come from merge.
					weight="bold"
				>
					{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step0.welcome')}
				</Text>
				<Text>🌊</Text>
			</View>
			<Text width={237} type="a">
				{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step0.your_new_favorite')}
			</Text>
		</>
	);
};
