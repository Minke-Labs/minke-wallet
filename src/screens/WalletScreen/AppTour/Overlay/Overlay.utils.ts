import { Dimensions } from 'react-native';
import { AppTourStepType } from '../AppTour.types';

const { height, width } = Dimensions.get('screen');
export const getHole = (type: AppTourStepType) => {
	switch (type) {
		case 0:
			return {};
		case 1:
			return {
				width: 110,
				height: 110,
				borderRadius: 55,
				top: height * 0.16 + 60,
				left: width * 0.06 + 30
			};
		case 2:
			return {
				width: 110,
				height: 110,
				borderRadius: 55,
				top: height * 0.16 + 60,
				left: width * 0.5 + 30
			};
		case 3:
			return {
				width: 104,
				height: 64,
				borderRadius: 24,
				top: height * 0.162 + 150,
				left: width * 0.05
			};
		case 4:
			return {
				width: 239,
				height: 64,
				borderRadius: 24,
				top: height * 0.162 + 150,
				left: width * 0.05
			};
		case 5:
			return {
				width: width - 36,
				height: 64,
				borderRadius: 24,
				top: height * 0.162 + 150,
				left: width * 0.05
			};
		default:
			return {};
	}
};
