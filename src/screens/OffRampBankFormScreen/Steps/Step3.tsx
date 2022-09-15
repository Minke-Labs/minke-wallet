import React from 'react';
import { Text, Input } from '@components';

const Step2: React.FC = () => (
	<>
		<Text type="lMedium" weight="semiBold" mb="xs">
			Bank details
		</Text>

		<Input
			label="Account number"
			mb="s"
		/>

		<Input
			label="Routing number"
		/>
	</>
);

export default Step2;
