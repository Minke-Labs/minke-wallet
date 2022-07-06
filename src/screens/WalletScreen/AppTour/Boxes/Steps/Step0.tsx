import React, { useContext } from 'react';
import { View } from 'react-native';
import { useLanguage } from '@hooks';
import { Text } from '@components';
import Arrow from '../Arrow';
import { AppTourStepType } from '../../AppTour.types';
import { AppTourContext } from '../../Context/AppTourContext';

export const Step0 = () => {
	const { type, setType } = useContext(AppTourContext);
	const { i18n } = useLanguage();
	return (
		<>
			<View style={{ height: 25, flexDirection: 'row', marginBottom: 8 }}>
				<Text
					type="tMedium"
					weight="bold"
				>
					{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step0.welcome')}
				</Text>
				<Text>🌊</Text>
			</View>
			<Text width={237} type="a" marginBottom={16}>
				{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step0.your_new_favorite')}
			</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
				<Arrow onPress={() => setType(type + 1 as AppTourStepType)} />
			</View>
		</>
	);
};
