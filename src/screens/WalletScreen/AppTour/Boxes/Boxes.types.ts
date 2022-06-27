import { AppTourStepType } from '../AppTour.types';

export interface BoxesProps {
	type: AppTourStepType;
	setType: (val: AppTourStepType) => void;
	previous: any;
}
