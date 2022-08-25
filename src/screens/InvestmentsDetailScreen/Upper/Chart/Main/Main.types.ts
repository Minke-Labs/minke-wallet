import Animated, { SharedValue } from 'react-native-reanimated';
import { Vector } from 'react-native-redash';
import { GraphIndex } from '../Chart.types';

export interface ChartProps {
	previous: SharedValue<GraphIndex>;
	transition: SharedValue<number>;
	current: SharedValue<GraphIndex>;
	translation: Vector<Animated.SharedValue<number>>;
	graphs: any;
	color: string;
}
