import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { makeStyles } from './Selector.styles';
import { SelectorProps } from './Selector.types';
import { BUTTON_PADDING, NUM_TABS, SCREEN_WIDTH } from './Selector.utils';

const Selector: React.FC<SelectorProps> = ({ active, setActive }) => {
	const current = useSharedValue(0);
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const screenWidth = SCREEN_WIDTH - 48; // width - padding

	// if the index is 0 the first value will be 0
	// otherwise it will be the width divided by 3 times the index
	// Ex: index: 2, screenWidth: 380. Should transform to (380 / 3) * 2
	const transform = current.value === 0 ? BUTTON_PADDING : (screenWidth / NUM_TABS) * current.value + BUTTON_PADDING;
	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(transform) }]
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
