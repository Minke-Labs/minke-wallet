import Animated from 'react-native-reanimated';
import { Vector } from 'react-native-redash';
import { GraphIndex } from '../Chart.types';

export interface HeaderProps {
	translation: Vector<Animated.SharedValue<number>>;
	index: Animated.SharedValue<GraphIndex>;
	percChange: number;
	graphs: any;
}
