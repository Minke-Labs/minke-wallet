import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	useDerivedValue,
	withTiming,
	interpolate,
	Extrapolate
} from 'react-native-reanimated';
import { TouchableShrinksProps } from './TouchableShrinks.types';

const timing = { duration: 50 };

const TouchableShrinks: React.FC<TouchableShrinksProps> = ({
	onPress,
	children,
	shrinks = 0.98,
	disabled = false
}) => {
	const pressed = useSharedValue(false);

	const progress = useDerivedValue(() => (pressed.value ? withTiming(1, timing) : withTiming(0, timing)));

	const animatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(progress.value, [0, 1], [1, shrinks], Extrapolate.CLAMP);

		return {
			transform: [{ scale }]
		};
	});

	return (
		<TouchableWithoutFeedback
			onPressIn={() => {
				pressed.value = true;
			}}
			onPressOut={() => {
				pressed.value = false;
			}}
			{...{ onPress, disabled }}
		>
			<Animated.View style={animatedStyle}>{children}</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default TouchableShrinks;
