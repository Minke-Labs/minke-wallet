import React, { useContext } from 'react';
import { Text, Input } from '@components';
import { OffRampFormContext } from '../Context/OffRampFormContext';

const Step2: React.FC = () => {
	const { form, handleFormChange } = useContext(OffRampFormContext);

	return (
		<>
			<Text type="lMedium" weight="semiBold" mb="xs">
				Bank details
			</Text>

			<Input
				label="Account number"
				mb="s"
				onChangeText={(val) => handleFormChange('accountNumber', val)}
				value={form.accountNumber}
			/>

			<Input
				label="Routing number"
				onChangeText={(val) => handleFormChange('routingNumber', val)}
				value={form.routingNumber}
			/>
		</>
	);
};

export default Step2;
