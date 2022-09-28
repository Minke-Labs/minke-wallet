/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Text, Input } from '@components';
import { useOffRamp } from '../Context/OffRampFormContext';

const Step2: React.FC = () => {
	const { form, handleChange } = useOffRamp();

	return (
		<>
			<Text type="lMedium" weight="semiBold" mb="xs">
				Place of residence
			</Text>

			<Input
				label="Address"
				mb="s"
				onChangeText={(val) => handleChange('address', val)}
				value={form.address.txt}
				error={form.address.error}
			/>

			<Input
				label="City"
				mb="s"
				onChangeText={(val) => handleChange('city', val)}
				value={form.city.txt}
				error={form.city.error}
			/>

			<Input
				label="State"
				mb="s"
				onChangeText={(val) => handleChange('state', val)}
				value={form.state.txt}
				error={form.state.error}
			/>

			<Input
				label="Postal code"
				onChangeText={(val) => handleChange('postalCode', val)}
				value={form.postalCode.txt}
				error={form.postalCode.error}
			/>
		</>
	);
};

export default Step2;
