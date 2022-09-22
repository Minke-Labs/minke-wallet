/* eslint-disable max-len */
import { useCountry } from '@hooks';
import { CountriesType } from '@styles';
import React, { createContext, useMemo, useState } from 'react';

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

const isValidName = (value: string) => {
	const regx = /^[a-z ,.'-]+$/i;
	return regx.test(value);
};

const isValidBirthday = (value: string) => {
	const regx = /^(?:0[1-9]|[12]\d|3[01])([/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
	return regx.test(value);
};

const isValidAddress = (value: string) => {
	const regx = /[\w',-\\/.\s]/;
	return regx.test(value);
};

const isValidZipCode = (value: string) => {
	const regx = /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/;
	return regx.test(value);
};

const isValidAccountNumber = (value: string) => {
	const regx = /^Acc(?:oun)?t(?:\s+Number)?.+[\d-]+$/gm;
	return regx.test(value);
};

const isValidBankRoutingNumber = (value: string) => {
	const regx = /^((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|80)([0-9]{7})$/;
	return regx.test(value);
};

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

	const handleFormChange = (field: string, txt: string) => {
		const formObj = { ...form, [field]: txt };
		setForm(formObj);
	};

	const obj = useMemo(() => ({
		form,
		handleFormChange,
		isValidName,
		isValidBirthday,
		isValidAddress,
		isValidZipCode,
		isValidAccountNumber,
		isValidBankRoutingNumber
	}), [form]);

	return <OffRampFormContext.Provider value={obj}>{children}</OffRampFormContext.Provider>;
};

export default OffRampFormProvider;
