import React, { useEffect } from 'react';
import { View, Modal as RNModal, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';
import styles from './Modal.styles';
import ModalHeader from './ModalHeader';

const windowHeight = Dimensions.get('window').height;

interface Props {
	isVisible: boolean;
	onBackdropPress: () => void;
}

const Modal: React.FC<Props> = ({ children, onBackdropPress, isVisible }) => {
	const { colors } = useTheme();
	const position = useSharedValue(windowHeight);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateY: position.value }]
	}));

	useEffect(() => {
		position.value = withTiming(isVisible ? 0 : windowHeight, { duration: 350 });
	}, [isVisible]);

	return (
		<RNModal transparent visible={isVisible}>
			<TouchableWithoutFeedback onPress={onBackdropPress}>
				<View style={[styles.container, StyleSheet.absoluteFill]} />
			</TouchableWithoutFeedback>
			<Animated.View style={[styles.inner, animatedStyles, { backgroundColor: colors.background }]}>
				<ModalHeader onBackdropPress={onBackdropPress} />
				{children}
			</Animated.View>
		</RNModal>
	);
};

export default Modal;
