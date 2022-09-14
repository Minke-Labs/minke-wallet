import { SharedValue } from 'react-native-reanimated';
import { GraphIndex } from '../Chart.types';

export interface SelectorProps {
	previous: SharedValue<GraphIndex>;
	transition: SharedValue<number>;
	current: SharedValue<GraphIndex>;
	graphs: any;
}
