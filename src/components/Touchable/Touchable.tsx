import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ViewType } from '@styles';

interface TouchableProps extends ViewType {
	opacity: number;
}

const Touchable: React.FC<Partial<TouchableProps>> = ({
	children,
	opacity = 0.6,
	...rest
}) => (
	<TouchableOpacity
		activeOpacity={opacity}
		{...{ ...rest }}
	>
		{children}
	</TouchableOpacity>
);

export default Touchable;
