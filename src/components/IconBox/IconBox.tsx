import React from 'react';
import { IconType, ColorType, SpacingType } from '@styles';
import Icon from '../Icon/Icon';
import View from '../View/View';

interface IconBoxProps {
	icon: IconType;
	bgc?: keyof ColorType;
	mb?: SpacingType;
}

const IconBox: React.FC<IconBoxProps> = ({ icon, bgc, mb }) => (
	<View
		h={40}
		w={40}
		br="xxs"
		bgc={bgc}
		main="center"
		cross="center"
		mr="xs"
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