import React from 'react';
import { Text, Input } from '@components';
import { useOffRamp } from '../Context/OffRampFormContext';

const Step2: React.FC = () => {
	const { form, handleChange } = useOffRamp();

	return (
		<>
			<Text type="lMedium" weight="semiBold" mb="xs">
				Bank details
			</Text>

			<Input
				label="Account number"
				mb="s"
				onChangeText={(val) => handleChange('accountNumber', val)}
				value={form.accountNumber.txt}
				error={form.accountNumber.error}
				// errorDesc="Invalid accountNumber."
			/>

			<Input
				label="Routing number"
				onChangeText={(val) => handleChange('routingNumber', val)}
				value={form.routingNumber.txt}
				error={form.routingNumber.error}
				// errorDesc="Invalid routingNumber."
			/>
		</>
	);
};

export default Step2;
