import React, { useEffect, useState } from 'react';
import { View, Share, SafeAreaView } from 'react-native';
import { Text, WhiteButton } from '@components';
import { getENSAddress } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import QRCode from 'react-native-qrcode-svg';

const ReceiveModal = () => {
	const wallet = globalWalletState();
	const [ensName, setEnsName] = useState<string | null>();

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

	return (
		<SafeAreaView>
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
					{ensName ? (
						<Text weight="extraBold" type="h3">
							{ensName}
						</Text>
					) : null}
					<Text>{address}</Text>
				</View>
				<WhiteButton title="Share" icon="shareStroke" onPress={onShare} />
			</View>
		</SafeAreaView>
	);
};

export default ReceiveModal;
