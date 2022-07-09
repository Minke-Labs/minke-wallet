import { deviceHeight, deviceWidth } from '@styles';
import { AppTourStepType } from '../AppTour.types';

export const getHole = (type: AppTourStepType) => {
	switch (type) {
		case 0:
			return {};
		case 1:
			return {
				width: 110,
				height: 110,
				borderRadius: 55,
				top: deviceHeight * 0.16 + 60,
				left: deviceWidth * 0.06 + 30
			};
		case 2:
			return {
				width: 110,
				height: 110,
				borderRadius: 55,
				top: deviceHeight * 0.16 + 60,
				left: deviceWidth * 0.5 + 30
			};
		case 3:
			return {
				width: 104,
				height: 64,
				borderRadius: 24,
				top: deviceHeight * 0.162 + 150,
				left: deviceWidth * 0.05
			};
		case 4:
			return {
				width: 239,
				height: 64,
				borderRadius: 24,
				top: deviceHeight * 0.162 + 150,
				left: deviceWidth * 0.05
			};
		case 5:
			return {
				width: deviceWidth - 36,
				height: 64,
				borderRadius: 24,
				top: deviceHeight * 0.162 + 150,
				left: deviceWidth * 0.05
			};
		default:
			return {};
	}
};
