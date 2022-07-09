import React from 'react';
import { deviceHeight, deviceWidth } from '@styles';
import { AppTourStepType } from '../AppTour.types';
import { Step0, Step1, Step2, Step3, Step4, Step5 } from './Steps';

const center = deviceWidth / 2 - 153;

export const getBox = (type: AppTourStepType) => {
	switch (type) {
		case 0:
			return {
				position: {
					top: deviceHeight * 0.4,
					left: center
				},
				component: <Step0 />
			};
		case 1:
			return {
				position: {
					top: deviceHeight * 0.18 + 180,
					left: deviceWidth * 0.02
				},
				component: <Step1 />
			};
		case 2:
			return {
				position: {
					top: deviceHeight * 0.18 + 180,
					left: deviceWidth * 0.16
				},
				component: <Step2 />
			};
		case 3:
			return {
				position: {
					top: deviceHeight * 0.26 + 170,
					left: center
				},
				component: <Step3 />
			};
		case 4:
			return {
				position: {
					top: deviceHeight * 0.26 + 170,
					left: center
				},
				component: <Step4 />
			};
		case 5:
			return {
				position: {
					top: deviceHeight * 0.26 + 170,
					left: center
				},
				component: <Step5 />
			};
		default:
			return {};
	}
};
