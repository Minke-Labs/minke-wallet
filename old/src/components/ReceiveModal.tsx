import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Share } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { getENSAddress } from 'old/src/model/wallet';
import { globalWalletState } from 'old/src/stores/WalletStore';
import QRCode from 'react-native-qrcode-svg';
import Modal from 'old/src/components/Modal';
import globalStyles from 'old/src/components/global.styles';
import RoundButton from './RoundButton';

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

const ReceiveModal = ({
	visible,
	onDismiss,
	onCloseAll
}: {
	visible: boolean;
	onDismiss: () => void;
	onCloseAll: () => void;
}) => {
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
		<Portal>
			<Modal headline="Receive" visible={visible} onCloseAll={onCloseAll} onDismiss={onDismiss}>
				<>
					<Text style={globalStyles.subHeadline}>Show your QR code or share your informations</Text>
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
						<QRCode value={address} size={250} color="#34769D" />
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
					<RoundButton text="Share" icon="ios-share" onPress={onShare} />
				</>
			</Modal>
		</Portal>
	);
};

export default ReceiveModal;
