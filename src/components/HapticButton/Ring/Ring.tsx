import React, { useEffect } from 'react';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	withRepeat,
	withTiming
} from 'react-native-reanimated';
import { styles } from './Ring.styles';

const Ring = () => {
	const ring = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: interpolate(ring.value, [0, 1], [0, 1]) }]
	}));

	useEffect(() => {
		ring.value = withRepeat(withTiming(1, { duration: 900 }), -1, false);
	}, []);

	return <Animated.View style={[styles.ring, animatedStyle]} />;
};

export default Ring;
