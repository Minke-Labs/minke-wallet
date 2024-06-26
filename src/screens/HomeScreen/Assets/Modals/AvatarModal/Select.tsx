import React from 'react';
import { FlatList } from 'react-native';
import { View, Text } from '@components';
import { useAvatar, useLanguage } from '@hooks';
import { Item } from './Item';

interface SelectProps {
	onBack: () => void;
}

export const Select: React.FC<SelectProps> = ({ onBack }) => {
	const { i18n } = useLanguage();
	const { avatars, setMinkeAvatarId } = useAvatar();

	const handleClick = (id: number) => {
		setMinkeAvatarId(id);
		onBack();
	};

	return (
		<View ph="xs">
			<Text
				type="hMedium"
				weight="bold"
				mb="xs"
			>
				{i18n.t('HomeScreen.Assets.Modals.AvatarModal.Select.select')}
			</Text>
			<FlatList
				style={{ marginBottom: 20 }}
				keyExtractor={(item) => item.name}
				data={avatars}
				renderItem={({ item, index }) => <Item avatar={item} onPress={() => handleClick(index)} />}
			/>
		</View>
	);
};
