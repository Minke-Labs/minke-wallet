import React, { useContext } from 'react';
import { Text, Input } from '@components';
import { OffRampFormContext } from '../Context/OffRampFormContext';

const Step2: React.FC = () => {
	const { form, handleFormChange } = useContext(OffRampFormContext);

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
			/>

			<Input
				label="City"
				mb="s"
				onChangeText={(val) => handleFormChange('city', val)}
				value={form.city}
			/>

			<Input
				label="State"
				mb="s"
				onChangeText={(val) => handleFormChange('state', val)}
				value={form.state}
			/>

			<Input
				label="Postal code"
				onChangeText={(val) => handleFormChange('postalCode', val)}
				value={form.postalCode}
			/>
		</>
	);
};

export default Step2;
