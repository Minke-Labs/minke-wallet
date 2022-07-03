import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, ModalHeader } from '@components';
import { useAvatar } from '@hooks';
import { Item } from './Item';
import { AvatarModalProps } from './AvatarModal.types';

export const Select: React.FC<AvatarModalProps> = ({ onDismiss }) => {
	const { avatars, setAvatarId } = useAvatar();

	const handleClick = (id: number) => {
		setAvatarId(id);
		onDismiss();
	};

	return (
		<>
			<ModalHeader {...{ onDismiss }} />
			<View style={{ paddingHorizontal: 16 }}>
				<Text
					type="hMedium"
					weight="bold"
					marginBottom={16}
				>
					Select your avatar
				</Text>
				<FlatList
					style={{ marginBottom: 20 }}
					keyExtractor={(item) => item.name}
					data={avatars}
					renderItem={({ item, index }) => <Item avatar={item} onPress={() => handleClick(index)} />}
				/>
			</View>
		</>
	);
};
