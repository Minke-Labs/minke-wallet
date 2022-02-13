/* eslint-disable no-param-reassign */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useSharedValue,
	useAnimatedStyle,
	withSpring
} from 'react-native-reanimated';
import { getYForX, Vector } from 'react-native-redash';
import { graphs } from './Graph.utils';
import { GraphIndex } from './Graph.types';

const CURSOR = 50;
const styles = StyleSheet.create({
	cursor: {
		width: CURSOR,
		height: CURSOR,
		borderRadius: CURSOR / 2,
		backgroundColor: '#cda8e73b',
		justifyContent: 'center',
		alignItems: 'center'
	},
	cursorBody: {
		width: 15,
		height: 15,
		borderRadius: 7.5,
		backgroundColor: '#6a0dad'
	}
});

interface CursorProps {
	index: Animated.SharedValue<GraphIndex>;
	translation: Vector<Animated.SharedValue<number>>;
}

const Cursor = ({ index, translation }: CursorProps) => {
	const isActive = useSharedValue(false);
	const onGestureEvent = useAnimatedGestureHandler({
		onStart: () => {
			isActive.value = true;
		},
		onActive: (event) => {
			translation.x.value = event.x;
			translation.y.value = getYForX(graphs[index.value].data.path, translation.x.value) || 0;
		},
		onEnd: () => {
			isActive.value = false;
		}
	});

	const style = useAnimatedStyle(() => {
		const translateX = translation.x.value - CURSOR / 2;
		const translateY = translation.y.value - CURSOR / 2;
		return {
			transform: [{ translateX }, { translateY }, { scale: withSpring(isActive.value ? 1 : 0) }]
		};
	});

	return (
		<View style={StyleSheet.absoluteFill}>
			<PanGestureHandler {...{ onGestureEvent }}>
				<Animated.View style={StyleSheet.absoluteFill}>
					<Animated.View style={[styles.cursor, style]}>
						<View style={styles.cursorBody} />
					</Animated.View>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

export default Cursor;
