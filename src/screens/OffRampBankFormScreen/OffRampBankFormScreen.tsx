/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Header } from '@components';
import { BasicLayout } from '@layouts';
import { AreaObjType } from '@src/components/TelephoneInput/TelephoneInput.types';
import { Step3 } from './Steps';

const OffRampBankFormScreen = () => {
	const [iso, setIso] = useState<AreaObjType>('US');
	const [text, setText] = useState('');
	return (
		<BasicLayout>
			<Header
				onLinkClick={() => null}
				title="Personal information"
				link="Next"
				mb="m"
			/>
			<View ph="xs">

				<Step3 />

			</View>
		</BasicLayout>
	);
};

export default OffRampBankFormScreen;
