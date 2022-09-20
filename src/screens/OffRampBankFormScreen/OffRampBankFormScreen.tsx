/* eslint-disable no-console */
import React, { useContext } from 'react';
import { View, Header } from '@components';
import { BasicLayout } from '@layouts';
import { useFormProgress, useNavigation } from '@hooks';
import { Step1, Step2, Step3 } from './Steps';
import { OffRampFormContext } from './Context/OffRampFormContext';

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

export const OffRampBankForm = () => {
	const navigation = useNavigation();
	const { currentStep, goForward, goBack } = useFormProgress();
	const { form } = useContext(OffRampFormContext);

	const handleBack = () => {
		if (currentStep === 0) return navigation.goBack();
		return goBack();
	};

	const handleForward = () => {
		if (currentStep === 2) {
			console.log(form);
			return navigation.navigate('OffRampSendScreen');
		}
		// if (Object.values(error).find((val) => val === true)) {
		// console.log(Object.values(error));
		// return null;
		// }
		return goForward();
	};

	return (
		<>
			<BasicLayout>

				<Header
					onPress={handleBack}
					onLinkClick={handleForward}
					title={getStep(currentStep).title}
					link={getStep(currentStep).link}
					mb="l"
				/>

				<View ph="xs">
					{getStep(currentStep).component}
				</View>

			</BasicLayout>
		</>
	);
};
