/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Dimensions, View } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';
import Animated, {
	Easing,
	useAnimatedGestureHandler,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
	withTiming
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import { BoxesProps } from './Boxes.types';
import { getBox } from './Boxes.utils';
import { Paper } from './Paper';

const { width } = Dimensions.get('window');

const CARD_WIDTH = 300;

const side = (width + CARD_WIDTH + 50) / 2;
const SNAP_POINTS = [-side, 0, side];

export const Boxes: React.FC<BoxesProps> = ({ type, shuffleBack, index }) => {
	const x = useSharedValue(0);
	const y = useSharedValue(0);
	const scale = useSharedValue(1);

	useAnimatedReaction(
		() => shuffleBack.value,
		() => {
			if (shuffleBack.value) {
				const delay = 150 * index;
				x.value = withDelay(delay, withSpring(0));
			}
		}
	);

	const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number; y: number }>({
		onStart: (_, ctx) => {
			ctx.x = x.value;
			ctx.y = y.value;
		},
		onActive: ({ translationX, translationY }, ctx) => {
			x.value = ctx.x + translationX;
			y.value = ctx.y + translationY;
		},
		onEnd: ({ velocityX, velocityY }) => {
			const dest = snapPoint(x.value, velocityX, SNAP_POINTS);

			x.value = withSpring(dest, { velocity: velocityX });
			y.value = withSpring(0, { velocity: velocityY });
			scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) }, () => {
				if (index === 0 && dest !== 0) {
					shuffleBack.value = true;
				}
			});
		}
	});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: x.value },
			{ translateY: y.value }
		]
	}));

	return (
		<PanGestureHandler onGestureEvent={onGestureEvent}>
			<Animated.View
				style={[
					{ position: 'absolute', ...(getBox(type).position) },
					animatedStyle
				]}
			>
				<Paper>
					{getBox(type).component}
				</Paper>
			</Animated.View>
		</PanGestureHandler>
	);
};
