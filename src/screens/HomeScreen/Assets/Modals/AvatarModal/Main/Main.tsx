import React from 'react';
import { Image } from 'react-native';
import { Text, Flag, Button, View } from '@components';
import { useAvatar, useLanguage } from '@hooks';

interface MainProps {
	onSelectAvatar: () => void;
}

export const Main: React.FC<MainProps> = ({ onSelectAvatar }) => {
	const { i18n } = useLanguage();
	const { currentAvatar, pickImage } = useAvatar();
	return (
		<View ph="s" cross="center">
			<View mb="xxs" row cross="center">
				<Text type="hMedium" weight="bold">
					{currentAvatar.name}
				</Text>
				<View mr="xxs" />
				{typeof currentAvatar.id !== 'undefined' && <Flag name={currentAvatar.flag} size={16} />}
			</View>
			<Image
				source={currentAvatar.image}
				style={{
					width: 92,
					height: 92,
					borderRadius: 46,
					marginBottom: 8
				}}
			/>
			<Text
				width={210}
				center
				type="bSmall"
				mb="xxs"
			>
				{currentAvatar.desc}
			</Text>
			<Text
				weight="bold"
				type="hMedium"
				mb="s"
			>
				{i18n.t('HomeScreen.Assets.Modals.AvatarModal.Main.edit')}
			</Text>
			<Button
				title={i18n.t('HomeScreen.Assets.Modals.AvatarModal.Main.select')}
				mb="xs"
				onPress={onSelectAvatar}
			/>
			<Button
				title={i18n.t('HomeScreen.Assets.Modals.AvatarModal.Main.choose')}
				mb="xs"
				onPress={pickImage}
			/>
		</View>
	);
};
