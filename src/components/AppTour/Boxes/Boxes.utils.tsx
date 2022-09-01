import React from 'react';
import { deviceHeight, deviceWidth } from '@styles';
import { AppTourStepType } from '../AppTour.types';
import { Step0, Step1, Step2, Step3, Step4 } from './Steps';

const center = deviceWidth / 2 - 138;

export const getBox = (type: AppTourStepType) => {
	switch (type) {
		case 0:
			return {
				position: {
					top: deviceHeight * 0.16 + 176,
					left: center
				},
				component: <Step0 />
			};
		case 1:
			return {
				position: {
					top: deviceHeight * 0.16 + 176,
					left: deviceWidth * 0.06 + 3
				},
				component: <Step1 />
			};
		case 2:
			return {
				position: {
					bottom: deviceHeight * -0.06 + 200,
					left: deviceWidth * 0.16
				},
				component: <Step2 />
			};
		case 3:
			return {
				position: {
					bottom: deviceHeight * -0.06 + 200,
					left: center
				},
				component: <Step3 />
			};
		case 4:
			return {
				position: {
					bottom: deviceHeight * -0.06 + 200,
					left: center
				},
				component: <Step4 />
			};
		default:
			return {};
	}
};
