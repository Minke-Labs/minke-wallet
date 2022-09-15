import React, { useState } from 'react';
import { TelephoneInput, Text, Input, ChangeCountry } from '@components';
import { AreaObjType } from '@src/components/TelephoneInput/TelephoneInput.types';

// type Iso = 'US' | 'BR' | 'AU';

const Step1: React.FC = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [iso, setIso] = useState<AreaObjType>('US');
	const [text, setText] = useState('');

	return (
		<>
			<ChangeCountry />

			<Text type="lMedium" weight="semiBold" mb="xs">
				Personal information
			</Text>

			<Input
				label="First name"
				mb="s"
				// error
			/>

			<Input
				label="Last name"
				mb="s"
			/>

			<Input
				label="Birthday"
				mb="s"
			/>

			<TelephoneInput.Input
				label="Mobile number"
				value={text}
				onChangeText={(t) => setText(t)}
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
