/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Header, Scroll } from '@components';
import { BasicLayout } from '@layouts';
import { useFormProgress } from '@hooks';
import { Step1, Step2, Step3 } from './Steps';

export const getStep = (type: number) => {
	switch (type) {
		case 0:
			return {
				component: <Step1 />,
				title: 'Personal information',
				link: 'Next'
			};
		case 1:
			return {
				component: <Step2 />,
				title: 'Place of residence',
				link: 'Next'
			};
		case 2:
			return {
				component: <Step3 />,
				title: 'Bank details',
				link: 'Save & continue'
			};
		default:
			return {
				component: <Step1 />,
				title: 'Personal information',
				link: 'Next'
			};
	}
};

const OffRampBankFormScreen = () => {
	const { currentStep, goForward } = useFormProgress();

	return (
		<BasicLayout>

			<Header
				onPress={() => null}
				onLinkClick={goForward}
				title={getStep(currentStep).title}
				link={getStep(currentStep).link}
				mb="l"
			/>

			<View ph="xs">
				{getStep(currentStep).component}
			</View>

		</BasicLayout>
	);
};

export default OffRampBankFormScreen;
