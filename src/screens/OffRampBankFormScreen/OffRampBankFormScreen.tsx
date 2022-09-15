/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Header } from '@components';
import { BasicLayout } from '@layouts';
import { AreaObjType } from '@src/components/TelephoneInput/TelephoneInput.types';
import { useFormProgress } from '@hooks';
import { Step1, Step2, Step3 } from './Steps';

export const getStep = (type: number) => {
	switch (type) {
		case 0:
			return {
				component: <Step1 />
			};
		case 1:
			return {
				component: <Step2 />
			};
		case 2:
			return {
				component: <Step3 />
			};
		default:
			return {};
	}
};

const OffRampBankFormScreen = () => {
	const { currentStep, goForward } = useFormProgress();

	return (
		<BasicLayout>
			<Header
				onLinkClick={goForward}
				title="Personal information"
				link="Next"
				mb="m"
			/>

			<View ph="xs">
				{getStep(currentStep).component}
			</View>

		</BasicLayout>
	);
};

export default OffRampBankFormScreen;
