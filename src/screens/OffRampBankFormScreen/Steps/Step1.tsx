import React, { useContext, useState } from 'react';
import { Text, Input, ChangeCountry, TelephoneInput } from '@components';
import { OffRampFormContext } from '../Context/OffRampFormContext';

const Step1: React.FC = () => {
	const { form, error, handleFormChange } = useContext(OffRampFormContext);
	const [telephone, setTelephone] = useState('');

	return (
		<>
			<ChangeCountry setCountry={(val) => handleFormChange('country', val)} />

			<Text type="lMedium" weight="semiBold" mb="xs">
				Personal information
			</Text>

			<Input
				label="First Name"
				mb="s"
				onChangeText={(val) => handleFormChange('firstName', val)}
				value={form.firstName}
				error={error.firstName}
				errorDesc="Invalid characters. Use only (A-Z)"
			/>

			<Input
				label="Last Name"
				mb="s"
				onChangeText={(val) => handleFormChange('lastName', val)}
				value={form.lastName}
				error={error.lastName}
				errorDesc="Invalid characters. Use only (A-Z)"
			/>

			<Input
				label="Birthday"
				mb="s"
				onChangeText={(val) => handleFormChange('birthday', val)}
				value={form.birthday}
				// error={form.birthday.length > 0 && !isValidBirthday(form.birthday)}
				// errorDesc="Invalid birthday format. Please use dd/mm/yyyy format."
			/>

			<TelephoneInput
				label="Mobile number"
				value={telephone}
				onChangeText={(t) => setTelephone(t)}
			/>
		</>
	);
};

export default Step1;
