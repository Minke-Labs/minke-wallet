import React, { useEffect } from 'react';
import { BasicLayout } from '@layouts';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat
} from 'react-native-reanimated';
import { screenWidth } from '@styles';
import { Gradient } from './Gradient';
import styles from './BlankLayout.styles';

const timing = { duration: 900 };

const BlankLayout: React.FC = ({ children }) => {
	const left = useSharedValue(-screenWidth);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: left.value }]
	}));

	useEffect(() => {
		left.value = withRepeat(withTiming(screenWidth, timing), -1);
	}, []);

	return (
		<BasicLayout hideSafeAreaView center bg="background5">
			{children}
			<Animated.View style={[styles.container, animatedStyle]}>
				<Gradient />
			</Animated.View>
		</BasicLayout>
	);
};

export default BlankLayout;
