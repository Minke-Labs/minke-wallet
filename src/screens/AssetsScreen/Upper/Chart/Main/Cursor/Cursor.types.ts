import Animated from 'react-native-reanimated';
import { Vector } from 'react-native-redash';
import { GraphIndex } from '../../Chart.types';

export interface CursorProps {
	index: Animated.SharedValue<GraphIndex>;
	translation: Vector<Animated.SharedValue<number>>;
	graphs: any;
	color: string;
}
