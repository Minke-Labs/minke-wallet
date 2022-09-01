import React, { useContext } from 'react';
import { useLanguage } from '@hooks';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import Arrow from '../Arrow';
import { AppTourStepType } from '../../AppTour.types';
import { AppTourContext } from '../../Context/AppTourContext';

export const Step0 = () => {
	const { type, setType } = useContext(AppTourContext);
	const { i18n } = useLanguage();
	return (
		<>
			<View row mb="xxs">
				<Text type="tMedium" weight="bold">
					{i18n.t('Components.AppTour.Boxes.Steps.Step0.welcome')}
				</Text>
				<View mr="xxxs" />
				<Text>🌊</Text>
			</View>
			<Text width={237} type="bSmall" mb="xs">
				{i18n.t('Components.AppTour.Boxes.Steps.Step0.your_new_favorite')}
			</Text>
			<View row main="flex-end">
				<Arrow onPress={() => setType(type + 1 as AppTourStepType)} />
			</View>
		</>
	);
};
