import React from 'react';
import { View, SafeAreaView, Image } from 'react-native';
import { Text, ModalHeader, Flag, Button } from '@components';
import { useAvatar } from '@hooks';
import styles from './AvatarModal.styles';

interface AvatarModalProps {
	onDismiss: () => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({ onDismiss }) => {
	const { value } = useAvatar();
	console.log('VALOR É: ', value);
	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.container}>
				<View style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginBottom: 8
				}}
				>
					<Text type="hMedium" weight="bold" style={{ marginRight: 8 }}>DeShark</Text>
					<Flag name="australia" size={16} />
				</View>
				<Image
					source={require('../../../../avatars/DeShark.png')}
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
					The Australian shark that loves navigating the waters of DEFI.
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
		</SafeAreaView>
	);
};

export default AvatarModal;
