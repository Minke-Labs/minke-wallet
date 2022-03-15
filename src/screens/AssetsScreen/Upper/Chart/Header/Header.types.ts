import Animated from 'react-native-reanimated';
import { GraphIndex } from '../Chart.types';

export interface HeaderProps {
	current: Animated.SharedValue<GraphIndex>;
	graphs: any;
	price: Readonly<Animated.SharedValue<string>>
}
