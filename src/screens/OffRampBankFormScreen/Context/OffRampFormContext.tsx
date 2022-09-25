/* eslint-disable no-console */
/* eslint-disable no-tabs */
/* eslint-disable max-len */
// import { useCountry } from '@hooks';
// import { CountriesType } from '@styles';
import { useFormProgress, useNavigation } from '@hooks';
import React, { createContext, useContext, useMemo, useState } from 'react';

type Form = {
	firstName: {
		txt: string;
		error: string;
	};
	lastName: {
		txt: string;
		error: string;
	};
	// lastName: string;
	// birthday: string;
	// address: string;
	// city: string;
	// state: string;
	// postalCode: string;
	// accountNumber: string;
	// routingNumber: string;
	// country: CountriesType;
};

const chooseRegex = (type: string) => {
	switch (type) {
		case 'firstName' || 'lastName':
			return /^[a-z ,.'-]+$/i;
		case 'birthday':
			return /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
		case 'address':
			return /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
		case 'zipCode':
			return /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/;
		case 'accountNumber':
			return /^Acc(?:oun)?t(?:\s+Number)?.+[\d-]+$/gm;
		case 'routingNumber':
			return /^((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|80)([0-9]{7})$/;
		default:
			return /^[a-z ,.'-]+$/i;
	}
};

const isValid = (type: string, val: string) => {
	const regx = chooseRegex(type);
	return regx.test(val);
};

const OffRampFormContext = createContext<any>(null);
export const useOffRamp = () => useContext(OffRampFormContext);

const OffRampFormProvider: React.FC = ({ children }) => {
	const navigation = useNavigation();
	const { currentStep, goForward, goBack } = useFormProgress();

	// const { country } = useCountry();
	const [form, setForm] = useState<Form>({
		firstName: {
			txt: '',
			error: ''
		},
		lastName: {
			txt: '',
			error: ''
		}
		// lastName: '',
		// birthday: '',
		// address: '',
		// city: '',
		// state: '',
		// postalCode: '',
		// accountNumber: '',
		// routingNumber: '',
		// country
	});

	const handleChange = (name: string, value: string) => {
		setForm((prev) => ({
			...prev,
			[name]: {
				...prev[name as keyof Form],
				txt: value,
				dirty: true
			}
		}));

		if (value !== '') {
			if (!isValid(name, value)) {
				setForm((prev) => ({
					...prev,
					[name]: {
						...prev[name as keyof Form],
						error: 'Invalid characters. Use only (A-Z)'
					}
				}));
			} else {
				setForm((prev) => ({
					...prev,
					[name]: {
						...prev[name as keyof Form],
						error: ''
					}
				}));
			}
		} else {
			setForm((prev) => ({
				...prev,
				[name]: {
					...prev[name as keyof Form],
					error: ''
				}
			}));
		}
	};

	const setErrorRequired = (name: string) => {
		setForm((prev) => ({
			...prev,
			[name]: {
				...prev[name as keyof Form],
				error: 'This field is required'
			}
		}));
	};

	const handleForward = () => {
		if (currentStep === 0) {
			if (form.firstName.txt.trim() === '') setErrorRequired('firstName');
			if (form.lastName.txt.trim() === '') setErrorRequired('lastName');

			const isThereError = Object.values(form).some((item) => (item.txt.trim() === '') || (item.error.trim() !== ''));
			if (isThereError) return null;
			return goForward();
		}
		return null;
	};

	const handleBack = () => {
		if (currentStep === 0) return navigation.goBack();
		return goBack();
	};

	const obj = useMemo(() => ({
		form,
		isValid,
		handleChange,
		handleForward,
		currentStep,
		goForward,
		goBack,
		handleBack
	}), [form, currentStep]);

	return <OffRampFormContext.Provider value={obj}>{children}</OffRampFormContext.Provider>;
};

export default OffRampFormProvider;
