import React from 'react';
import { Text, Input } from '@components';

const Step2: React.FC = () => (
	<>
		<Text type="lMedium" weight="semiBold" mb="xs">
			Place of residence
		</Text>

		<Input
			label="Address"
			mb="s"
		/>

		<Input
			label="City"
			mb="s"
		/>

		<Input
			label="State"
			mb="s"
		/>

		<Input
			label="Postal code"
		/>
	</>
);

export default Step2;
