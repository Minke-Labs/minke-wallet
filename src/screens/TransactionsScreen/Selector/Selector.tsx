import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { makeStyles } from './Selector.styles';
import { SelectorProps } from './Selector.types';

export const BUTTON_WIDTH = 100;

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => {
	const current = useSharedValue(0);
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(BUTTON_WIDTH * (current.value * 1.13) + 8) }]
	}));

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.backgroundTag, animatedBackgroundTag]} />
			{['All', 'Sent', 'Received'].map((item, index) => (
				<TouchableOpacity
					key={item}
					onPress={() => {
						setActive(index);
						current.value = index;
					}}
					style={styles.buttonContainer}
				>
					<Text weight={active === index ? 'bold' : 'regular'} color={active === index ? 'text11' : 'text9'}>
						{item}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

export default Selector;
