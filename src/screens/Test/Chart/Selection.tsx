/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React from 'react';
import Animated, { SharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Text } from '@components';
import { graphs } from './Graph.utils';
import { GraphIndex } from './Graph.types';

const { width } = Dimensions.get('window');

const BUTTON_WIDTH = width / graphs.length;

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
		width: BUTTON_WIDTH,
		height: 32
	}
});

interface SelectionProps {
	previous: SharedValue<GraphIndex>;
	transition: SharedValue<number>;
	current: SharedValue<GraphIndex>;
}

const Selection: React.FC<SelectionProps> = ({ previous, current, transition }) => {
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(BUTTON_WIDTH * (current.value + 0.18)) }]
	}));

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.backgroundTag, animatedStyle]} />

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
						}}
					>
						<Animated.View style={[styles.labelContainer]}>
							<Text color="text4" weight="extraBold">
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
