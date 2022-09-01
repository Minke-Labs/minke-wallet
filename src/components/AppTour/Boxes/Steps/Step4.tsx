import React, { useContext } from 'react';
import { useLanguage } from '@hooks';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import Touchable from '@src/components/Touchable/Touchable';
import Arrow from '../Arrow';
import { AppTourStepType } from '../../AppTour.types';
import { AppTourContext } from '../../Context/AppTourContext';

const FinishButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
	const { i18n } = useLanguage();
	return (
		<Touchable
			row
			main="flex-end"
			cross="center"
			onPress={onPress}
		>
			<Text type="lMedium" weight="semiBold" color="cta1" style={{ marginRight: 8 }}>
				{i18n.t('Components.AppTour.Boxes.Steps.Step5.finish')}
			</Text>
			<Icon name="checkmark" size={20} color="cta1" />
		</Touchable>
	);
};

export const Step4 = () => {
	const { dismiss, type, setType } = useContext(AppTourContext);
	const { i18n } = useLanguage();
	return (
		<>
			<View row mb="xxs">
				<Icon
					name="gift"
					size={20}
					color="cta1"
				/>
				<View mr="xxs" />
				<Text type="tMedium" weight="bold">
					{i18n.t('Components.AppTour.Boxes.Steps.Step4.earn_minke_points')}
				</Text>
			</View>
			<Text width={237} color="text2" type="bSmall" mb="xs">
				{i18n.t('Components.AppTour.Boxes.Steps.Step4.refer_a_friend')}
			</Text>

			<View row main="space-between">
				<Arrow left onPress={() => setType(type - 1 as AppTourStepType)} />
				<FinishButton onPress={dismiss} />
			</View>
		</>
	);
};
