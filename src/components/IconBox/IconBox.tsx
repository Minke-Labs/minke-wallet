import React from 'react';
import { IconType, ColorType, SpacingType } from '@styles';
import Icon from '../Icon/Icon';
import View from '../View/View';

interface IconBoxProps {
	icon: IconType;
	bg?: keyof ColorType;
	mb?: SpacingType;
}

const IconBox: React.FC<IconBoxProps> = ({ icon, bg, mb }) => (
	<View
		h={40}
		w={40}
		br={2}
		bgc={bg || 'background2'}
		main="center"
		cross="center"
		mr={3}
		mb={mb}
	>
		<Icon
			size={24}
			color="cta1"
			name={icon}
		/>
	</View>
);

export default IconBox;
