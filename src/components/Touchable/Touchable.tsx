import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ViewType } from '@styles';
import View from '../View/View';

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
	<TouchableOpacity onPress={onPress} activeOpacity={opacity}>
		<View {...{ ...rest }}>
			{children}
		</View>
	</TouchableOpacity>
);

export default Touchable;
