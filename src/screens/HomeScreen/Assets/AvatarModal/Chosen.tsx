import React from 'react';
import { View, Image } from 'react-native';
import { Text, Flag, Button } from '@components';
import { useAvatar, useLanguage } from '@hooks';
import styles from './AvatarModal.styles';

interface ChosenProps {
	onSelectAvatar: () => void;
}

export const Chosen: React.FC<ChosenProps> = ({ onSelectAvatar }) => {
	const { i18n } = useLanguage();
	const { currentAvatar, pickImage, avatarType } = useAvatar();
	return (
		<View style={styles.container}>
			<View style={{
				flexDirection: 'row',
				alignItems: 'center',
				marginBottom: 8
			}}
			>
				<Text
					type="hMedium"
					weight="bold"
					style={{ marginRight: 8 }}
				>
					{currentAvatar.name}
				</Text>
				{avatarType === 'minke' && <Flag name={currentAvatar.flag} size={16} />}
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
				marginBottom={8}
			>
				{currentAvatar.desc}
			</Text>
			<Text
				weight="bold"
				type="hMedium"
				marginBottom={24}
			>
				{i18n.t('WalletScreen.Modals.AvatarModal.Chosen.edit')}
			</Text>
			<Button
				title={i18n.t('WalletScreen.Modals.AvatarModal.Chosen.select')}
				mb="xs"
				onPress={onSelectAvatar}
			/>
			<Button
				title={i18n.t('WalletScreen.Modals.AvatarModal.Chosen.choose')}
				mb="xs"
				onPress={pickImage}
			/>
		</View>
	);
};
