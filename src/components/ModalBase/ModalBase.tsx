import React, { useEffect } from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { useTheme } from '@hooks';
import { screenHeight, navigationBarHeight, statusBarHeight } from '@styles';
import styles from './ModalBase.styles';

interface ModalBaseProps {
	isVisible: boolean;
	onDismiss: () => void;
	center?: boolean;
}

const ModalBase: React.FC<ModalBaseProps> = ({ children, onDismiss, isVisible, center }) => {
	const { colors } = useTheme();
	const top = useSharedValue(screenHeight);

	const isActive = useDerivedValue<boolean>(() => {
		if (top.value > screenHeight - 10) return false;
		return true;
	}, [top]);

	const backdropAnimatedStyle = useAnimatedStyle(() => ({
		display: isActive.value ? 'flex' : 'none',
		opacity: interpolate(top.value, [0, screenHeight], [1, 0])
	}));

	const statusBar = navigationBarHeight === 0 ? statusBarHeight || 0 : 0;
	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateY: top.value - navigationBarHeight - statusBar }]
	}));

	useEffect(() => {
		top.value = withTiming(isVisible ? 0 : screenHeight);
		if (!isVisible) {
			Keyboard.dismiss();
		}
	}, [isVisible]);

	return (
		<View style={styles.fullScreen}>
			<TouchableWithoutFeedback onPress={onDismiss}>
				<Animated.View style={[
					styles.backdrop,
					backdropAnimatedStyle
				]}
				/>
			</TouchableWithoutFeedback>
			<Animated.View
				style={[
					styles.container,
					animatedStyles,
					{
						backgroundColor: colors.background1,
						...(center && { alignItems: 'center' })
					}
				]}
			>
				{isVisible && children}
			</Animated.View>
		</View>
	);
};

export default ModalBase;
