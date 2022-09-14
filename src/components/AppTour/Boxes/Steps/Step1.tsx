import React, { useContext } from 'react';
import { useLanguage } from '@hooks';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import Arrow from '../Arrow';
import { AppTourStepType } from '../../AppTour.types';
import { AppTourContext } from '../../Context/AppTourContext';

export const Step1 = () => {
	const { type, setType } = useContext(AppTourContext);
	const { i18n } = useLanguage();
	return (
		<>
			<View mb="xxs" row cross="center">
				<Icon name="add" size={20} color="cta1" />
				<View mr="xxs" />
				<Text type="tMedium" weight="bold">
					{i18n.t('Components.AppTour.Boxes.Steps.Step1.add_funds')}
				</Text>
			</View>
			<Text width={237} color="text2" type="bSmall" mb="xs">
				{i18n.t('Components.AppTour.Boxes.Steps.Step1.you_can_buy')}
			</Text>
			<View row main="space-between">
				<Arrow left onPress={() => setType(type - 1 as AppTourStepType)} />
				<Arrow onPress={() => setType(type + 1 as AppTourStepType)} />
			</View>
		</>
	);
};
