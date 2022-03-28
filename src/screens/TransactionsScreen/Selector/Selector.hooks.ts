import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BUTTON_PADDING, NUM_TABS, SCREEN_WIDTH } from './Selector.utils';

export const useSelector = () => {
	const current = useSharedValue(0);
	const screenWidth = SCREEN_WIDTH - 48; // width - padding

	// if the index is 0 the first value will be 0
	// otherwise it will be the width divided by 3 times the index
	// Ex: index: 2, screenWidth: 380. Should transform to (380 / 3) * 2
	const transform = current.value === 0 ? BUTTON_PADDING : (screenWidth / NUM_TABS) * current.value + BUTTON_PADDING;
	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(transform) }]
	}));

	return {
		current,
		animatedBackgroundTag
	};
};
