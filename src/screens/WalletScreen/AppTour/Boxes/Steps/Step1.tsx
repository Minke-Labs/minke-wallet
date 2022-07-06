import React, { useContext } from 'react';
import { View } from 'react-native';
import { useLanguage } from '@hooks';
import { Text, Icon } from '@components';
import Arrow from '../Arrow';
import { AppTourStepType } from '../../AppTour.types';
import { AppTourContext } from '../../Context/AppTourContext';

export const Step1 = () => {
	const { type, setType } = useContext(AppTourContext);
	const { i18n } = useLanguage();
	return (
		<>
			<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
				<Icon
					name="addStroke"
					size={20}
					color="cta1"
					style={{ marginRight: 8 }}
				/>
				<Text
					type="tMedium"
					weight="bold"
				>
					{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step1.add_funds')}
				</Text>
			</View>
			<Text width={237} type="a" marginBottom={16}>
				{i18n.t('WalletScreen.AppTour.Boxes.Steps.Step1.you_can_buy')}
			</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Arrow left onPress={() => setType(type - 1 as AppTourStepType)} />
				<Arrow onPress={() => setType(type + 1 as AppTourStepType)} />
			</View>
		</>
	);
};
