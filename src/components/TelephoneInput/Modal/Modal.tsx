import React from 'react';
import { FlatList } from 'react-native';
import ModalComponent from '@src/components/Modal/Modal';
import View from '@src/components/View/View';
import { AreaObjType } from '../TelephoneInput.types';
import { areaObj } from '../TelephoneInput.utils';
import { Item } from './Item';

interface ModalProps {
	isVisible: boolean;
	onDismiss: () => void;
	setValue: (val: AreaObjType) => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onDismiss, setValue }) => {
	const handlePress = (val: string) => {
		onDismiss();
		setValue(val as AreaObjType);
	};
	return (
		<ModalComponent isVisible={isVisible} onDismiss={onDismiss}>
			<View ph="xs">
				<FlatList
					data={Object.keys(areaObj)}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => (
						<Item
							iso={item as AreaObjType}
							onPress={() => handlePress(item)}
						/>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		</ModalComponent>
	);
};

export default Modal;
