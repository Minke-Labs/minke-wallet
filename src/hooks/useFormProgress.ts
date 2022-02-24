import { useState } from 'react';

const useFormProgress = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const goForward = () => setCurrentStep(currentStep + 1);
	const goBack = () => currentStep > 0 && setCurrentStep(currentStep - 1);
	return [currentStep, setCurrentStep, goForward, goBack] as const;
};

export default useFormProgress;
