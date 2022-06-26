import Animated from 'react-native-reanimated';
import { AppTourStepType } from '../AppTour.types';

export interface BoxesProps {
	type: AppTourStepType;
	index: number;
	shuffleBack: Animated.SharedValue<boolean>;
}
