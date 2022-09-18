/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-tabs */
import React, { useState } from 'react';
import { TelephoneInput, Text, Input, ChangeCountry } from '@components';
import { AreaObjType } from '@src/components/TelephoneInput/TelephoneInput.types';

const regName = /^[a-z ,.'-]+$/i;

type Erros = {
	firstName: string;
};

const Step1: React.FC = () => {
	const [iso, setIso] = useState<AreaObjType>('US');
	const [telephone, setTelephone] = useState('');

	const [inputs, setInputs] = useState({
		firstname: ''
	});
	const [errors, setErrors] = useState<Erros>({} as Erros);

	const handleOnchange = (text: string, input: string) => {
		setInputs((prevState) => ({ ...prevState, [input]: text }));
	};

	const handleError = (error: string, input: string) => {
		setErrors((prevState) => ({ ...prevState, [input]: error }));
	};

	// const [form, setForm] = useState({
	// 	firstName: '',
	// 	lastName: ''
	// });

	// const [errors, setErrors] = useState({
	// 	firstName: {
	// 		error: false,
	// 		message: 'Invalid characters. Use only (A-Z)'
	// 	},
	// 	lastName: {
	// 		error: false,
	// 		message: 'Invalid characters. Use only (A-Z)'
	// 	}
	// });

	// const handleUpdate = (label: string, txt: string) => {
	// 	const formObj = {
	// 		...form,
	// 		[label]: {
	// 			...[label],
	// 			label: txt,
	// 			error: !regName.test(txt)
	// 		}
	// 	};
	// 	setForm(formObj);
	// };

	return (
		<>
			<ChangeCountry />

			<Text type="lMedium" weight="semiBold" mb="xs">
				Personal information
			</Text>

			<Input
				onChangeText={(val) => handleUpdate('firstName', val)}
				value={form.firstName}
				label="First name"
				errorDesc={errors.firstName}
				// mb={errors.firstName.error ? 'xxs' : 's'}
			/>

			{/* <Input
				onChangeText={(val) => handleUpdate('firstName', val)}
				value={form.firstName}
				label="First name"
				mb={errors.firstName.error ? 'xxs' : 's'}
				error={errors.firstName.error}
				errorDesc="Invalid characters. Use only (A-Z)"
			/> */}

			{/* <Input
				onChangeText={(val) => handleUpdate('lastName', val)}
				value={form.lastName}
				label="Last name"
				mb={errors.lastName.error ? 'xxs' : 's'}
				error={errors.lastName.error}
				errorDesc="Invalid characters. Use only (A-Z)"
			/> */}

			{/* <Input
				label="Birthday"
				mb="s"
			/> */}

			<TelephoneInput
				label="Mobile number"
				value={telephone}
				onChangeText={(t) => setTelephone(t)}
			/>
		</>
	);
};

export default Step1;
