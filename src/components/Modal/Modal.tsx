import React, { useState, useEffect } from 'react';
import { View, Modal as RNModal, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';
import styles from './Modal.styles';
import ModalHeader from './ModalHeader';

const windowHeight = Dimensions.get('window').height;

interface Props {
	visible: boolean;
	onBackdropPress: () => void;
}

const Modal: React.FC<Props> = ({ children, onBackdropPress, visible }) => {
	const { colors } = useTheme();
	const [isVisible, setIsVisible] = useState(false);
	const position = useSharedValue(windowHeight);

	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateY: position.value }]
	}));

	useEffect(() => {
		if (visible) setIsVisible(true);
		else setIsVisible(false);
	}, [visible]);

	useEffect(() => {
		position.value = withTiming(isVisible ? 0 : windowHeight, { duration: 350 });
	}, [isVisible]);

	return (
		<RNModal transparent animationType="none" visible={isVisible}>
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
