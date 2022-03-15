import Animated from 'react-native-reanimated';

export interface PercChangeProps {
	data: Readonly<Animated.SharedValue<any>>;
	percChange: boolean;
}
