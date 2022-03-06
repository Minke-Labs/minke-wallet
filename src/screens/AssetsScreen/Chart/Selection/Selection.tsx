/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Text } from '@components';
// import { graphs } from './Graph.utils';
import { GraphIndex } from '../Chart.types';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		width,
		marginBottom: 34
	},

	backgroundTag: {
		backgroundColor: '#006AA6',
		...StyleSheet.absoluteFillObject,
		width: 52,
		height: '100%',
		borderRadius: 16
	},

	labelContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 32
	}
});

interface SelectionProps {
	previous: SharedValue<GraphIndex>;
	transition: SharedValue<number>;
	current: SharedValue<GraphIndex>;
	graphs: any;
}

const Selection: React.FC<SelectionProps> = ({ previous, current, transition, graphs }) => {
	const BUTTON_WIDTH = width / graphs.length;

	const [using, setUsing] = useState(0);

	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(BUTTON_WIDTH * (current.value + 0.11)) }]
	}));

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.backgroundTag, animatedBackgroundTag]} />

			<FlatList
				keyExtractor={(item) => item.label}
				data={graphs}
				renderItem={({ item, index }) => (
					<TouchableWithoutFeedback
						key={item.label}
						onPress={() => {
							previous.value = current.value;
							transition.value = 0;
							current.value = index as GraphIndex;
							transition.value = withTiming(1);
							setUsing(item.value);
						}}
					>
						<Animated.View style={[styles.labelContainer, { width: BUTTON_WIDTH }]}>
							<Text
								color={item.value === using ? 'text6' : 'text9'}
								weight={item.value === using ? 'bold' : 'regular'}
							>
								{item.label}
							</Text>
						</Animated.View>
					</TouchableWithoutFeedback>
				)}
				horizontal
			/>
		</View>
	);
};

export default Selection;
