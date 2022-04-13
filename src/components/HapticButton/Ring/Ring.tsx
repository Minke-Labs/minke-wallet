import React, { useEffect } from 'react';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	withTiming
} from 'react-native-reanimated';
import { styles } from './Ring.styles';

const timing = { duration: 900 };

const Ring = () => {
	const ring = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: interpolate(ring.value, [0, 1], [0.5, 1]) }]
	}));

	useEffect(() => {
		ring.value = withTiming(1, timing);
	}, []);

	return <Animated.View style={[styles.ring, animatedStyle]} />;
};

export default Ring;
