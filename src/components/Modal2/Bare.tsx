/* eslint-disable no-return-assign */
import React, { PropsWithChildren, useImperativeHandle } from 'react';
import { View, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';
import { useTheme } from 'react-native-paper';
import styles from './Modal.styles';

const screen = Dimensions.get('screen');

export type ModalProps = {
	show: () => void;
	dismiss: () => void;
};

const Bare = React.forwardRef<ModalProps, PropsWithChildren<{ height: number; onDismiss:() => void }>>(
	({ height, onDismiss, children }, ref) => {
		const { colors } = useTheme();
		const top = useSharedValue(screen.height);

		const isActive = useDerivedValue<boolean>(() => {
			if (top.value > screen.height - 10) return false;
			return true;
		}, [top]);

		useImperativeHandle(ref, () => ({
			show: () => (top.value = withTiming(screen.height - height)),
			dismiss: () => (top.value = withTiming(screen.height)),
			isActive: isActive.value
		}));

		const containerAnimatedStyle = useAnimatedStyle(() => ({ top: top.value }));

		const backdropAnimatedStyle = useAnimatedStyle(() => ({
			opacity: interpolate(top.value, [screen.height - height, screen.height], [1, 0]),
			top: isActive.value ? 0 : screen.height
		}));

		return (
			<View style={styles.fullScreen}>
				<TouchableWithoutFeedback onPress={onDismiss}>
					<Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
				</TouchableWithoutFeedback>
				<Animated.View
					style={[styles.container, { height, backgroundColor: colors.background }, containerAnimatedStyle]}
				>
					{children}
				</Animated.View>
			</View>
		);
	});

export default Bare;
