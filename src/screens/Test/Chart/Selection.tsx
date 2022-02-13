/* eslint-disable no-param-reassign */
import React from 'react';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native';
import { graphs } from './Graph.utils';
import { GraphIndex } from './Graph.types';

const { width } = Dimensions.get('window');

const SELECTION_WIDTH = width - 32;
const BUTTON_WIDTH = (width - 32) / graphs.length;

const styles = StyleSheet.create({
	selection: {
		flexDirection: 'row',
		width: SELECTION_WIDTH,
		borderWidth: 1,
		borderColor: 'red'
	},

	backgroundSelection: {
		backgroundColor: '#006AA6',
		...StyleSheet.absoluteFillObject,
		width: BUTTON_WIDTH,
		height: 32,
		borderRadius: 16
	},

	labelContainer: {
		padding: 16,
		width: BUTTON_WIDTH
	},
	label: {
		fontSize: 16,
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

interface SelectionProps {
	previous: SharedValue<GraphIndex>;
	transition: SharedValue<number>;
	current: SharedValue<GraphIndex>;
}

const Selection: React.FC<SelectionProps> = ({ previous, current, transition }) => {
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(BUTTON_WIDTH * current.value) }]
	}));

	return (
		<View style={styles.selection}>
			<Animated.View style={[styles.backgroundSelection, animatedStyle]} />

			<FlatList
				contentContainerStyle={{ width: '100%', justifyContent: 'space-between' }}
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
						}}
					>
						<Animated.View style={[styles.labelContainer]}>
							<Text style={styles.label}>{item.label}</Text>
						</Animated.View>
					</TouchableWithoutFeedback>
				)}
				horizontal
			/>
		</View>
	);
};

export default Selection;
