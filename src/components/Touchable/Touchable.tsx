import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ViewType } from '@styles';

interface TouchableProps extends ViewType {
	opacity: number;
	onPress: () => void;
}

const Touchable: React.FC<Partial<TouchableProps>> = ({
	children,
	onPress,
	opacity = 0.6,
	...rest
}) => (
	<TouchableOpacity
		onPress={onPress}
		activeOpacity={opacity}
		{...{ ...rest }}
	>
		{children}
	</TouchableOpacity>
);

export default Touchable;
