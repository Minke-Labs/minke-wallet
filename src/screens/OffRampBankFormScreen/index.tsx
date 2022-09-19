import React from 'react';
import { OffRampBankForm } from './OffRampBankFormScreen';
import OffRampFormProvider from './Context/OffRampFormContext';

const OffRampBankFormScreen = () => (
	<OffRampFormProvider>
		<OffRampBankForm />
	</OffRampFormProvider>
);

export default OffRampBankFormScreen;
