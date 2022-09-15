import React, { useState } from 'react';
import { TelephoneInput, Text, Input } from '@components';
import { AreaObjType } from '@src/components/TelephoneInput/TelephoneInput.types';

type Iso = 'US' | 'BR' | 'AU';

interface Step1Props {
	text: string;
	setText: (val: string) => void;
	iso: Iso;
	setIso: (val: Iso) => void;
}

const Step1: React.FC<Step1Props> = ({ text, setIso, setText, iso }) => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<Text type="lMedium" weight="semiBold" mb="xs">
				Personal information
			</Text>

			<Input
				label="First name"
				mb="s"
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
