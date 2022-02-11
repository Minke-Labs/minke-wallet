import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Share, SafeAreaView } from 'react-native';
import { Text, WhiteButton } from '@components';
import { getENSAddress } from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import QRCode from 'react-native-qrcode-svg';

const styles = StyleSheet.create({
	address: {
		fontSize: 16,
		marginBottom: 16
	},
	boldText: {
		fontFamily: 'Inter_800ExtraBold',
		fontSize: 24
	}
});

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
				<Text marginBottom={24} style={{ width: '100%' }}>
					Show your QR code or share your informations
				</Text>
				<View
					style={{
						borderRadius: 20,
						backgroundColor: '#FFFFFF',
						padding: 40,
						marginTop: 30,
						marginBottom: 30,
						alignItems: 'center',
						alignSelf: 'center',
						width: '90%'
					}}
				>
					<QRCode value={address} size={280} color="#34769D" />
				</View>
				<View
					style={{
						alignItems: 'center',
						marginBottom: 30,
						marginTop: 30
					}}
				>
					{ensName ? <Text style={styles.boldText}>{ensName}</Text> : null}
					<Text style={styles.address}>{address}</Text>
				</View>
				<WhiteButton title="Share" icon="shareStroke" onPress={onShare} />
			</View>
		</SafeAreaView>
	);
};

export default ReceiveModal;
