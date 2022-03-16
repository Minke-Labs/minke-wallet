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
import { getYForX } from 'react-native-redash';
import { addColorOpacity } from '@helpers/utilities';
import { CURSOR } from './Cursor.utils';
import { styles } from './Cursor.styles';
import { CursorProps } from './Cursor.types';

const Cursor: React.FC<CursorProps> = ({ color, index, translation, graphs }) => {
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
					<Animated.View style={[styles.cursor, style, { backgroundColor: addColorOpacity(color, 0.2) }]}>
						<View style={[styles.cursorBody, { backgroundColor: color }]} />
					</Animated.View>
				</Animated.View>
			</PanGestureHandler>
		</View>
	);
};

export default Cursor;
