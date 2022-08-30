import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, Text } from '@components';
import { useLanguage } from '@hooks';

interface ArrowProps {
	left?: boolean;
	onPress: () => void;
}

const Arrow: React.FC<ArrowProps> = ({ left, onPress }) => {
	const { i18n } = useLanguage();
	return (
		<TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPress}>
			{left && <Icon name="arrowLeft" size={20} color="cta1" />}
			<Text type="lMedium" weight="semiBold" color="cta1" style={{ marginHorizontal: 8 }}>
				{left
					? i18n.t('WalletScreen.AppTour.Boxes.Arrow.back')
					: i18n.t('WalletScreen.AppTour.Boxes.Arrow.next')}
			</Text>
			{!left && <Icon name="arrowRight" size={20} color="cta1" />}
		</TouchableOpacity>
	);
};

export default Arrow;
