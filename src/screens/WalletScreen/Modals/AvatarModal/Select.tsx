import React from 'react';
import { View, FlatList } from 'react-native';
import { Text, ModalHeader } from '@components';
import { useAvatar, useLanguage } from '@hooks';
import { Item } from './Item';

interface SelectProps {
	onDismiss: () => void;
	onBack: () => void;
}

export const Select: React.FC<SelectProps> = ({ onDismiss, onBack }) => {
	const { i18n } = useLanguage();
	const { avatars, setAvatarId } = useAvatar();

	const handleClick = (id: number) => {
		setAvatarId(id);
		onDismiss();
	};

	return (
		<>
			<ModalHeader {...{ onDismiss }} onBack={onBack} />
			<View style={{ paddingHorizontal: 16 }}>
				<Text
					type="hMedium"
					weight="bold"
					marginBottom={16}
				>
					{i18n.t('WalletScreen.Modals.AvatarModal.Select.select')}
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
