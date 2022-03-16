import Animated from 'react-native-reanimated';

type GraphIndex = 0 | 1 | 2 | 3 | 4 | 5;
export interface ChangesProps {
	graphs: any;
	current: Animated.SharedValue<GraphIndex>;
	tokenHistory: any;
	color: string;
}
