import React, { useEffect, useState } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Modal as RNModal, Animated as ReactAnimated } from 'react-native';
import Animated, {
	EasingNode,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
	timing
} from 'react-native-reanimated';
import { useTheme } from '@hooks';
import {
	screenHeight,
	navigationBarHeight,
	statusBarHeight
} from '@styles';
import styles from './ModalBase.styles';

interface ModalBaseProps {
	isVisible: boolean;
	onDismiss: () => void;
}

const ModalBase: React.FC<ModalBaseProps> = ({ children, onDismiss, isVisible }) => {
	const statusBar = navigationBarHeight === 0 ? statusBarHeight || 0 : 0;
	const [topAnimated] = useState(new Animated.Value(screenHeight - navigationBarHeight - statusBar));

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

	const animatedStyles = ({
		transform: [{ translateY: topAnimated }]
	});

	const animateFocus = () => {
		ReactAnimated.parallel([
			// @ts-ignore
			timing(topAnimated, {
				toValue: 0,
				duration: 200,
				easing: EasingNode.ease
			})
		]).start();
	};

	useEffect(() => {
		top.value = withTiming(isVisible ? 0 : screenHeight);
		if (!isVisible) {
			Keyboard.dismiss();
		}
		animateFocus();
	}, [isVisible]);

	if (!isVisible) return <View />;

	return (
		<RNModal transparent visible={isVisible}>
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
						{ backgroundColor: colors.background1 }
					]}
				>
					{children}
				</Animated.View>
			</View>
		</RNModal>
	);
};

export default ModalBase;
