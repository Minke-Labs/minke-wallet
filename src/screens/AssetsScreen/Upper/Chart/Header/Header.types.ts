import Animated from 'react-native-reanimated';
import { GraphIndex } from '../Chart.types';

export interface HeaderProps {
	current: Animated.SharedValue<GraphIndex>;
	percChange: number;
	graphs: any;
	price: Readonly<Animated.SharedValue<string>>
}
