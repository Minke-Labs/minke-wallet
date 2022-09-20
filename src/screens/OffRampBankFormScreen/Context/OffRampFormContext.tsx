/* eslint-disable max-len */
import { useCountry } from '@hooks';
import { CountriesType } from '@styles';
import React, { createContext, useMemo, useState, useEffect } from 'react';

type Form = {
	firstName: string;
	lastName: string;
	birthday: string;
	address: string;
	city: string;
	state: string;
	postalCode: string;
	accountNumber: string;
	routingNumber: string;
	country: CountriesType;
};

type FormError = {
	firstName: boolean;
	lastName: boolean;
	birthday: boolean;
	address: boolean;
	city: boolean;
	state: boolean;
	postalCode: boolean;
	accountNumber: boolean;
	routingNumber: boolean;
};

const isValidName = (value: string) => {
	const regx = /^[a-z ,.'-]+$/i;
	return regx.test(value);
};

// const isValidBirthday = (value: string) => {
// const regx = /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
// return regx.test(value);
// };

export const OffRampFormContext = createContext<any>(null);

const OffRampFormProvider: React.FC = ({ children }) => {
	const { country } = useCountry();
	const [form, setForm] = useState<Form>({
		firstName: '',
		lastName: '',
		birthday: '',
		address: '',
		city: '',
		state: '',
		postalCode: '',
		accountNumber: '',
		routingNumber: '',
		country
	});

	const [error, setError] = useState<FormError>({
		firstName: false,
		lastName: false,
		birthday: false,
		address: false,
		city: false,
		state: false,
		postalCode: false,
		accountNumber: false,
		routingNumber: false
	});

	const handleFormChange = (field: string, txt: string) => {
		const formObj = { ...form, [field]: txt };
		setForm(formObj);
	};

	const handleError = (field: string, type: boolean) => {
		const errorObj = { ...error, [field]: type };
		setError(errorObj);
	};

	useEffect(() => {
		if (form.firstName.length > 0 && !isValidName(form.firstName)) setError({ ...error, firstName: true });
		else setError({ ...error, firstName: false });
	}, [form]);

	const obj = useMemo(() => ({
		form,
		handleFormChange,
		error,
		handleError
	}), [form]);

	return <OffRampFormContext.Provider value={obj}>{children}</OffRampFormContext.Provider>;
};

export default OffRampFormProvider;
