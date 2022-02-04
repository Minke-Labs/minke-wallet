/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';
import ModalHeader from './ModalHeader';
import styles from './Modal.styles';

const screenHeight = Dimensions.get('window').height;

interface ModalProps {
	isVisible: boolean;
	onDismiss: () => void;
}

const height = 500;

const Modal: React.FC<ModalProps> = ({ children, isVisible, onDismiss }) => {
	const top = useSharedValue(screenHeight);
	const { colors } = useTheme();
	const [currentHeight, setCurrentHeight] = useState<any>(null);

	const show = () => (top.value = withTiming(screenHeight - height));
	const dismiss = () => (top.value = withTiming(screenHeight));

	useEffect(() => {
		if (isVisible) show();
		else dismiss();
	}, [isVisible]);

	useEffect(() => {
		console.log(currentHeight);
	}, [currentHeight]);

	const isActive = useDerivedValue<boolean>(() => {
		if (top.value > screenHeight - 10) return false;
		return true;
	}, [top]);

	const backdropAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(top.value, [screenHeight - height, screenHeight], [1, 0]),
		top: isActive.value ? 0 : screenHeight
	}));

	const animatedStyles = useAnimatedStyle(() => ({ top: top.value }));

	return (
		<View style={styles.fullScreen}>
			<TouchableWithoutFeedback onPress={onDismiss}>
				<Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
			</TouchableWithoutFeedback>
			<Animated.View
				onLayout={(e) => setCurrentHeight(e.nativeEvent.layout)}
				style={[styles.container, { backgroundColor: colors.background }, animatedStyles]}
			>
				<ModalHeader onBackdropPress={onDismiss} />
				{children}
			</Animated.View>
		</View>
	);
};

export default Modal;
