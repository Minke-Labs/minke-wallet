import React from 'react';
import { View, FlatList } from 'react-native';
import ModalBase from '@src/components/ModalBase/ModalBase';
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
		<ModalBase isVisible={isVisible} onDismiss={onDismiss}>
			<View style={{ padding: 16 }}>
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
		</ModalBase>
	);
};

export default Modal;
