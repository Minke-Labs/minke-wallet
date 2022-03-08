/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import styles from './Selector.styles';

export const BUTTON_WIDTH = 46;

const Selector: React.FC = () => {
	const [active, setActive] = useState(0);
	const { colors } = useTheme();
	const current = useSharedValue(0);

	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(BUTTON_WIDTH * (current.value)) }]
	}));

	useEffect(() => {
		console.log('CURRENT: ', active);
	}, [active]);

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.backgroundTag, animatedBackgroundTag]} />
			<TouchableOpacity
				onPress={() => {
					setActive(0);
					current.value = 0;
				}}
				style={{ flex: 1, borderWidth: 1, borderColor: 'red', height: '100%' }}
			/>
			<TouchableOpacity
				onPress={() => {
					setActive(1);
					current.value = 1;
				}}
				style={{ flex: 1, borderWidth: 1, borderColor: 'red', height: '100%' }}
			/>
			<TouchableOpacity
				onPress={() => {
					setActive(2);
					current.value = 2;
				}}
				style={{ flex: 1, borderWidth: 1, borderColor: 'red', height: '100%' }}
			/>
		</View>
	);
};

export default Selector;
