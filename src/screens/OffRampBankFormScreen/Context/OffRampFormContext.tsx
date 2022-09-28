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
	birthday: {
		txt: string;
		error: string;
	};
	address: {
		txt: string;
		error: string;
	};
	city: {
		txt: string;
		error: string;
	};
	state: {
		txt: string;
		error: string;
	};
	postalCode: {
		txt: string;
		error: string;
	};
	accountNumber: {
		txt: string;
		error: string;
	};
	routingNumber: {
		txt: string;
		error: string;
	};
	// country: CountriesType;
};

const getErrorMessage = (type: string) => {
	switch (type) {
		case 'firstName' || 'lastName':
			return 'Invalid characters. Use only (A-Z)';
		case 'birthday':
			return 'Invalid birthday format. Please use dd/mm/yyyy format.';
		case 'address':
			return 'Invalid Address.';
		case 'city':
			return 'Invalid City.';
		case 'state':
			return 'Invalid State.';
		case 'postalCode':
			return 'Invalid Postal Code.';
		case 'accountNumber':
			return 'Invalid Account Number.';
		case 'routingNumber':
			return 'Invalid Routing Number.';
		default:
			return 'Invalid characters. Use only (A-Z)';
	}
};

const chooseRegex = (type: string) => {
	switch (type) {
		// case 'firstName' || 'lastName':
		// 	return /^[a-z ,.'-]+$/i;
		// case 'birthday':
		// 	return /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
		// case 'address':
		// 	return /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
		// case 'zipCode':
		// 	return /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/;
		// case 'accountNumber':
		// 	return /^Acc(?:oun)?t(?:\s+Number)?.+[\d-]+$/gm;
		// case 'routingNumber':
		// 	return /^((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|80)([0-9]{7})$/;
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
		},
		birthday: {
			txt: '',
			error: ''
		},
		address: {
			txt: '',
			error: ''
		},
		city: {
			txt: '',
			error: ''
		},
		state: {
			txt: '',
			error: ''
		},
		postalCode: {
			txt: '',
			error: ''
		},
		accountNumber: {
			txt: '',
			error: ''
		},
		routingNumber: {
			txt: '',
			error: ''
		}
		// country
	});

	const handleChange = (name: string, value: string) => {
		setForm((prev) => ({
			...prev,
			[name]: { ...prev[name as keyof Form], txt: value }
		}));

		if (value !== '') {
			if (!isValid(name, value)) {
				setForm((prev) => ({
					...prev,
					[name]: {
						...prev[name as keyof Form],
						error: getErrorMessage(name)
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
			if (form.birthday.txt.trim() === '') setErrorRequired('birthday');

			if ((form.firstName.txt.trim() === '') || (form.firstName.error.trim() !== '')) return null;
			if ((form.lastName.txt.trim() === '') || (form.lastName.error.trim() !== '')) return null;
			if ((form.birthday.txt.trim() === '') || (form.birthday.error.trim() !== '')) return null;
			return goForward();
		}
		if (currentStep === 1) {
			if (form.address.txt.trim() === '') setErrorRequired('address');
			if (form.city.txt.trim() === '') setErrorRequired('city');
			if (form.state.txt.trim() === '') setErrorRequired('state');
			if (form.postalCode.txt.trim() === '') setErrorRequired('postalCode');

			if ((form.address.txt.trim() === '') || (form.address.error.trim() !== '')) return null;
			if ((form.city.txt.trim() === '') || (form.city.error.trim() !== '')) return null;
			if ((form.state.txt.trim() === '') || (form.state.error.trim() !== '')) return null;
			if ((form.postalCode.txt.trim() === '') || (form.postalCode.error.trim() !== '')) return null;

			return goForward();
		}
		if (currentStep === 2) {
			if (form.accountNumber.txt.trim() === '') setErrorRequired('accountNumber');
			if (form.routingNumber.txt.trim() === '') setErrorRequired('routingNumber');

			if ((form.accountNumber.txt.trim() === '') || (form.accountNumber.error.trim() !== '')) return null;
			if ((form.routingNumber.txt.trim() === '') || (form.routingNumber.error.trim() !== '')) return null;

			console.log('\n\n\n');
			console.log(form);
			return navigation.navigate('OffRampSendScreen');
		}

		return null;
	};

	const handleBack = () => {
		if (currentStep === 0) return navigation.goBack();
		return goBack();
	};

	const obj = useMemo(() => ({
		form,
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
