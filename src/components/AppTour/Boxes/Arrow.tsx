import React from 'react';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import Touchable from '@src/components/Touchable/Touchable';
import { useLanguage } from '@hooks';

interface ArrowProps {
	left?: boolean;
	onPress: () => void;
}

const Arrow: React.FC<ArrowProps> = ({ left, onPress }) => {
	const { i18n } = useLanguage();
	return (
		<Touchable row onPress={onPress}>
			{left && <Icon name="arrowLeft" size={20} color="cta1" />}
			<View mr="xxxs" />
			<Text type="lMedium" weight="semiBold" color="cta1">
				{left
					? i18n.t('Components.AppTour.Boxes.Arrow.back')
					: i18n.t('Components.AppTour.Boxes.Arrow.next')}
			</Text>
			<View mr="xxxs" />
			{!left && <Icon name="arrowRight" size={20} color="cta1" />}
		</Touchable>
	);
};

export default Arrow;
