/* eslint-disable max-len */
import { useCountry } from '@hooks';
import { CountriesType } from '@styles';
import React, { createContext, useContext, useMemo, useState } from 'react';

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

const chooseRegex = (type: string) => {
	switch (type) {
		case 'name':
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
export const useOffRamp = useContext(OffRampFormContext);

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

	const handleFormChange = (field: string, txt: string) => {
		const formObj = { ...form, [field]: txt };
		setForm(formObj);
	};

	const obj = useMemo(() => ({
		form,
		handleFormChange,
		isValid
	}), [form]);

	return <OffRampFormContext.Provider value={obj}>{children}</OffRampFormContext.Provider>;
};

export default OffRampFormProvider;
