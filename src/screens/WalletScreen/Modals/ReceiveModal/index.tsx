import React, { useEffect } from 'react';
import { View, Share, SafeAreaView } from 'react-native';
import { useState } from '@hookstate/core';
import { Text, WhiteButton, ModalHeader } from '@components';
import { getENSAddress } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import QRCode from 'react-native-qrcode-svg';
import { ActivityIndicator } from 'react-native-paper';
import { ReceiveModalProps } from './types';
import styles from './styles';

const ReceiveModal: React.FC<ReceiveModalProps> = ({ onDismiss }) => {
	const wallet = useState(globalWalletState());
	const [ensName, setEnsName] = React.useState<string | null>();

	const address = wallet.value.address || '';
	const onShare = async () => {
		await Share.share({ message: address });
	};

	useEffect(() => {
		const fetchENSAddress = async () => {
			const name = await getENSAddress(address);
			setEnsName(name);
		};
		fetchENSAddress();
	}, []);

	if (!address) {
		return <ActivityIndicator />;
	}

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.container}>
				<Text type="h3" weight="extraBold" style={{ width: '100%' }}>
					Receive
				</Text>
				<Text marginBottom={44} width="100%">
					Show your QR code or share your informations
				</Text>
				<View style={styles.QRCodeContainer}>
					<QRCode value={address} size={216} color="#34769D" />
				</View>
				<View style={styles.textContainer}>
					{ensName && (
						<Text weight="extraBold" type="h3">
							{ensName}
						</Text>
					)}
					<Text>{address}</Text>
				</View>
				<WhiteButton title="Share" icon="shareStroke" onPress={onShare} />
			</View>
		</SafeAreaView>
	);
};

export default ReceiveModal;
