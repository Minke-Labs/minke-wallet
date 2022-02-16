import React, { useEffect } from 'react';
import { View, Share, SafeAreaView } from 'react-native';
import { useState } from '@hookstate/core';
import { Text, WhiteButton, ModalHeader } from '@components';
import { getENSAddress } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import QRCode from 'react-native-qrcode-svg';
import { ActivityIndicator } from 'react-native-paper';

const ReceiveModal: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
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
			<View style={{ paddingHorizontal: 24, alignItems: 'center' }}>
				<Text type="h3" weight="extraBold" style={{ width: '100%' }}>
					Receive
				</Text>
				<Text marginBottom={44} style={{ width: '100%' }}>
					Show your QR code or share your informations
				</Text>
				<View
					style={{
						borderRadius: 20,
						backgroundColor: '#FFFFFF',
						alignItems: 'center',
						justifyContent: 'center',
						width: 280,
						height: 280,
						marginBottom: 24
					}}
				>
					<QRCode value={address} size={216} color="#34769D" />
				</View>
				<View
					style={{
						alignItems: 'center',
						marginBottom: 30
					}}
				>
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
