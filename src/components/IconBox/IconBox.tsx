import React from 'react';
import { View, Icon } from '@components';
import { IconType, ColorType, SpacingType } from '@styles';

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
		bg={bg || 'background2'}
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
