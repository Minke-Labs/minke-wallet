/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { TelephoneInput, Text, Input, ChangeCountry } from '@components';
import { AreaObjType } from '@src/components/TelephoneInput/TelephoneInput.types';

// type Iso = 'US' | 'BR' | 'AU';

const Step1: React.FC = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [iso, setIso] = useState<AreaObjType>('US');
	const [telephone, setTelephone] = useState('');
	const [firstName, setFirstName] = useState('');
	const [firstNameError, setFirstNameError] = useState(true);
	const [lastName, setLastName] = useState('');

	return (
		<>
			<ChangeCountry />

			<Text type="lMedium" weight="semiBold" mb="xs">
				Personal information
			</Text>

			<Input
				onChangeText={(val) => setFirstName(val)}
				value={firstName}
				label="First name"
				mb={firstNameError ? 'xxs' : 's'}
				error={firstNameError}
				errorDesc="Invalid characters. Use only (A-Z)"
			/>

			<Input
				onChangeText={(val) => setLastName(val)}
				value={lastName}
				label="Last name"
				mb="s"
			/>

			<Input
				label="Birthday"
				mb="s"
			/>

			<TelephoneInput.Input
				label="Mobile number"
				value={telephone}
				onChangeText={(t) => setTelephone(t)}
				openModal={() => setModalVisible(true)}
				iso={iso}
			/>

			<TelephoneInput.Modal
				setValue={(val: AreaObjType) => setIso(val)}
				isVisible={modalVisible}
				onDismiss={() => setModalVisible(false)}
			/>
		</>
	);
};

export default Step1;
