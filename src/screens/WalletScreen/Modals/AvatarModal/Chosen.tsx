import React from 'react';
import { View, Image } from 'react-native';
import { Text, ModalHeader, Flag, Button } from '@components';
import { useAvatar, useLanguage } from '@hooks';
import styles from './AvatarModal.styles';

interface ChosenProps {
	onDismiss: () => void;
	onSelectAvatar: () => void;
}

export const Chosen: React.FC<ChosenProps> = ({ onDismiss, onSelectAvatar }) => {
	const { i18n } = useLanguage();
	const { currentAvatar } = useAvatar();
	return (
		<>
			<ModalHeader {...{ onDismiss }} />
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
					<Flag name={currentAvatar.flag} size={16} />
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
					marginBottom={16}
					onPress={onSelectAvatar}
				/>
				<Button
					title={i18n.t('WalletScreen.Modals.AvatarModal.Chosen.choose')}
					marginBottom={16}
				/>
			</View>
		</>
	);
};
