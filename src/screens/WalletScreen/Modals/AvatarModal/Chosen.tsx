import React from 'react';
import { View, Image } from 'react-native';
import { Text, ModalHeader, Flag, Button } from '@components';
import { useAvatar } from '@hooks';
import styles from './AvatarModal.styles';
import { AvatarModalProps } from './AvatarModal.types';

export const Chosen: React.FC<AvatarModalProps> = ({ onDismiss }) => {
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
					Edit your avatar image
				</Text>
				<Button title="Select a Minke avatar" marginBottom={16} />
				<Button title="Choose from library" marginBottom={16} />
			</View>
		</>
	);
};
