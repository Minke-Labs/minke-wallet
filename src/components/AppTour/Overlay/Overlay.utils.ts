import {
	deviceHeight,
	deviceWidth,
	navigationBarHeight,
	screenHeight,
	os,
	spacing
} from '@styles';
import { AppTourStepType } from '../AppTour.types';

const sHeight = os === 'android' ? screenHeight : 0;
const offset = navigationBarHeight - (sHeight * 0.035);

export const getHole = (type: AppTourStepType) => {
	switch (type) {
		case 0:
			return {};
		case 1:
			return {
				width: deviceWidth * 0.72 + 0.22,
				height: 63,
				borderRadius: spacing.s,
				top: deviceHeight * 0.15 + 83.5 - offset,
				left: deviceWidth * 0.06 + 3
			};
		case 2:
			return {
				width: 76,
				height: 76,
				borderRadius: 76 / 2,
				top: deviceHeight * 0.852 - 9 - offset,
				left: deviceWidth * 0.5 + 22.2
			};
		case 3:
			return {
				width: 76,
				height: 76,
				borderRadius: 76 / 2,
				top: deviceHeight * 0.852 - 9 - offset,
				left: deviceWidth * 0.4
			};
		case 4:
			return {
				width: 146,
				height: 35,
				borderRadius: spacing.xxs,
				top: deviceHeight * 0.15 - 62 - offset,
				right: deviceWidth * 0.150 - 16.5
			};
		default:
			return {};
	}
};
