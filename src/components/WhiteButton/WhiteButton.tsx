import React from 'react';
import { IconType, ColorType } from '@styles';
import Text from '@src/components/Text/Text';
import Icon from '@src/components/Icon/Icon';
import View from '@src/components/View/View';
import Touchable from '../Touchable/Touchable';

interface WhiteButtonProps {
	title: string;
	onPress: () => void;
	icon: IconType;
	color?: keyof ColorType;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({ title, onPress, icon, color }) => (
	<Touchable
		s={2}
		h={60}
		mb="s"
		mt="s"
		onPress={onPress}
		row
	>
		<View
			row
			main="center"
			cross="center"
			w="100%"
			h="100%"
			br="xs"
			bgc="background2"
		>
			<Icon name={icon} size={16} color={color} />
			<View mr="xxs" />
			<Text type="lMedium" weight="semiBold" color="text1">
				{title}
			</Text>
		</View>
	</Touchable>
);

export default WhiteButton;
