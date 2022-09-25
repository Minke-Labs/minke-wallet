/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Text, Input, ChangeCountry, TelephoneInput } from '@components';
import { useOffRamp } from '../Context/OffRampFormContext';

const Step1: React.FC = () => {
	const { handleFormChange, error, form, isValid, handleChange } = useOffRamp();

	return (
		<>
			{/* <ChangeCountry setCountry={(val) => handleFormChange('country', val)} /> */}

			<Text type="lMedium" weight="semiBold" mb="xs">
				Personal information
			</Text>

			<Input
				label="First Name"
				mb="s"
				onChangeText={(val) => handleChange('firstName', val)}
				value={form.firstName.txt}
				error={form.firstName.error}
			/>

			<Input
				label="Last Name"
				mb="s"
				onChangeText={(val) => handleChange('lastName', val)}
				value={form.lastName.txt}
				error={form.lastName.error}
			/>
			{/*
			<Input
				label="Birthday"
				mb="s"
				onChangeText={(val) => handleFormChange('birthday', val)}
				value={form.birthday}
				error={error.birthday}
				errorDesc="Invalid birthday format. Please use dd/mm/yyyy format."
			/>

			<TelephoneInput
				label="Mobile number"
				value={telephone}
				onChangeText={(t) => setTelephone(t)}
			/> */}
		</>
	);
};

export default Step1;
