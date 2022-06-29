import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';
import Animated, {
	Easing,
	withTiming,
	runOnJS,
	withDelay,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import { AppTourStepType } from '../AppTour.types';
import { BoxesProps } from './Boxes.types';
import { getBox } from './Boxes.utils';
import Card from './Card';

const { width } = Dimensions.get('window');

const CARD_WIDTH = 269;
const side = (width + CARD_WIDTH + 50) / 2;
const SNAP_POINTS = [-side, 0, side];
const DURATION = 250;

const getInitX = (prev: any, type: number) => {
	if (prev > type) return -width;
	if (prev < type) return width;
	return 0;
};

export const Boxes: React.FC<BoxesProps> = ({ type, setType, previous }) => {
	const x = useSharedValue(getInitX(previous, type));

	useEffect(() => {
		const delay = 0;
		x.value = withDelay(
			delay,
			withTiming(0, { duration: DURATION, easing: Easing.inOut(Easing.ease) })
		);
	}, []);

	const updateType = (dest: number) => {
		if (dest > 0) setType(type - 1 as AppTourStepType);
		if (dest < 0) setType(type + 1 as AppTourStepType);
	};

	const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number; y: number }>({
		onStart: (_, ctx) => {
			ctx.x = x.value;
		},
		onActive: ({ translationX }, ctx) => {
			x.value = ctx.x + translationX;
		},
		onEnd: ({ velocityX }) => {
			const dest = snapPoint(x.value, velocityX, SNAP_POINTS);
			if ((type === 0 && dest > 0) || (type === 5 && dest < 0)) {
				x.value = withSpring(0, { velocity: velocityX });
			} else {
				x.value = withSpring(dest, { velocity: velocityX });
				runOnJS(updateType)(dest);
			}
		}
	});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateX: x.value }
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
				<Card type={type}>
					{getBox(type).component}
				</Card>
			</Animated.View>
		</PanGestureHandler>
	);
};
