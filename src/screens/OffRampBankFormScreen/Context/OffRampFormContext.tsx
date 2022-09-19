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

// const isValidName = (value: string) => {
// const regx = /^[a-z ,.'-]+$/i;
// return regx.test(value);
// };

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

	const handleFormChange = (field: string, txt: string) => {
		const formObj = { ...form, [field]: txt };
		setForm(formObj);
	};

	const obj = useMemo(() => ({
		form,
		handleFormChange
	}), [form]);

	return <OffRampFormContext.Provider value={obj}>{children}</OffRampFormContext.Provider>;
};

export default OffRampFormProvider;

// const [firstNameError, setFirstNameError] = useState(form.firstName.label.length > 0 && !isValidName(form.firstName.label));
