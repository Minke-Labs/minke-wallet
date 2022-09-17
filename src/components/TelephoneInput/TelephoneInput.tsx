import React, { useState } from 'react';
import Input from './Input/Input';
import Modal from './Modal/Modal';
import { AreaObjType } from './TelephoneInput.types';

interface TelephoneInputProps {
	label: string;
	value: string;
	onChangeText?: ((text: string) => void) | undefined;
}

const TelephoneInput: React.FC<TelephoneInputProps> = ({ label, value, onChangeText }) => {
	const [iso, setIso] = useState<AreaObjType>('US');
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<Input
				label={label}
				value={value}
				onChangeText={onChangeText}
				openModal={() => setModalVisible(true)}
				iso={iso}
			/>

			<Modal
				setValue={(val: AreaObjType) => setIso(val)}
				isVisible={modalVisible}
				onDismiss={() => setModalVisible(false)}
			/>
		</>
	);
};

export default TelephoneInput;
