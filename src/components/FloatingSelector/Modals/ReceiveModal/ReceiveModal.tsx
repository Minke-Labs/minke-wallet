import React from 'react';
import { View, SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useLanguage } from '@hooks';
import NetworkWarning from '../../../NetworkWarning';
import ActivityIndicator from '../../../ActivityIndicator/ActivityIndicator';
import ModalHeader from '../../../ModalHeader/ModalHeader';
import WhiteButton from '../../../WhiteButton/WhiteButton';
import Text from '../../../Text/Text';
import { ReceiveModalProps } from './ReceiveModal.types';
import styles from './ReceiveModal.styles';
import { useReceiveModal } from './ReceiveModal.hooks';

const ReceiveModal: React.FC<ReceiveModalProps> = ({ onDismiss }) => {
	const { i18n } = useLanguage();
	const { address, ensName, onShare } = useReceiveModal();

	if (!address) {
		return <ActivityIndicator />;
	}

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.container}>

				<Text type="h3" weight="extraBold" style={{ width: '100%' }}>
					{i18n.t('WalletScreen.Modals.ReceiveModal.receive')}
				</Text>

				<Text marginBottom={44} width="100%">
					{i18n.t('WalletScreen.Modals.ReceiveModal.show_qr')}
				</Text>

				<View style={styles.QRCodeContainer}>
					<QRCode value={address} size={216} color="#34769D" />
				</View>

				<View style={styles.textContainer}>
					{!!ensName && (
						<Text weight="extraBold" type="h3">
							{ensName}
						</Text>
					)}
					<Text>{address}</Text>
				</View>

				<NetworkWarning.Tag title={i18n.t('WalletScreen.Modals.ReceiveModal.sending_on')} />

				<WhiteButton
					title={i18n.t('Components.Buttons.share')}
					icon="shareStroke"
					onPress={onShare}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ReceiveModal;
