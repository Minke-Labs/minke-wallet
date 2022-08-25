import Animated from 'react-native-reanimated';

type GraphIndex = 0 | 1 | 2 | 3 | 4 | 5;

export interface BoxProps {
	graphs: any;
	current: Animated.SharedValue<GraphIndex>;
	data: Readonly<Animated.SharedValue<any>>;
	name: string;
}
