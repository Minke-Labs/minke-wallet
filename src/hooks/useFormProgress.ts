import { useState } from 'react';

const useFormProgress = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const goForward = () => setCurrentStep(currentStep + 1);
	const goBack = () => currentStep > 0 && setCurrentStep(currentStep - 1);
	const reset = () => setCurrentStep(0);
	return { currentStep, setCurrentStep, goForward, goBack, reset };
};

export default useFormProgress;
