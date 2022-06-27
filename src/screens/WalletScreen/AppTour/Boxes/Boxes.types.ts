import Animated from 'react-native-reanimated';
import { AppTourStepType } from '../AppTour.types';

export interface BoxesProps {
	type: AppTourStepType;
	shuffleBack: Animated.SharedValue<boolean>;
	setType: (val: AppTourStepType) => void;
	previous: any;
}
