import React, { useContext } from 'react';
import { Text, Input } from '@components';
import { OffRampFormContext } from '../Context/OffRampFormContext';

const Step2: React.FC = () => {
	const {
		form,
		handleFormChange,
		isValidAddress,
		isValidName,
		isValidZipCode
	} = useContext(OffRampFormContext);

	return (
		<>
			<Text type="lMedium" weight="semiBold" mb="xs">
				Place of residence
			</Text>

			<Input
				label="Address"
				mb="s"
				onChangeText={(val) => handleFormChange('address', val)}
				value={form.address}
				error={form.address.length > 0 && !isValidAddress(form.address)}
				errorDesc="Invalid Address."
			/>

			<Input
				label="City"
				mb="s"
				onChangeText={(val) => handleFormChange('city', val)}
				value={form.city}
				error={form.city.length > 0 && !isValidName(form.city)}
				errorDesc="Invalid city name."
			/>

			<Input
				label="State"
				mb="s"
				onChangeText={(val) => handleFormChange('state', val)}
				value={form.state}
				error={form.state.length > 0 && !isValidName(form.state)}
				errorDesc="Invalid state name."
			/>

			<Input
				label="Postal code"
				onChangeText={(val) => handleFormChange('postalCode', val)}
				value={form.postalCode}
				error={form.postalCode.length > 0 && !isValidZipCode(form.postalCode)}
				errorDesc="Invalid zip-code name."
			/>
		</>
	);
};

export default Step2;
