import React from 'react';
import { SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useLanguage } from '@hooks';
import View from '@src/components/View/View';
import ActivityIndicator from '@src/components/ActivityIndicator/ActivityIndicator';
import ModalHeader from '@src/components/ModalHeader/ModalHeader';
import WhiteButton from '@src/components/WhiteButton/WhiteButton';
import Text from '@src/components/Text/Text';
import NetworkWarning from '@src/components/NetworkWarning';
import { ReceiveModalProps } from './ReceiveModal.types';
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

			<View ph="s" cross="center">

				<Text
					width="100%"
					type="hMedium"
					weight="bold"
				>
					{i18n.t('Components.FloatingSelector.Modals.ReceiveModal.receive')}
				</Text>

				<Text mb="l" width="100%">
					{i18n.t('Components.FloatingSelector.Modals.ReceiveModal.show_qr')}
				</Text>

				<View
					br="xs"
					bgc="text11"
					main="center"
					cross="center"
					mb="s"
					w={280}
					h={280}
				>
					<QRCode
						value={address}
						size={216}
						color="#34769D"
					/>
				</View>

				<View mb="s" main="center">
					{!!ensName && (
						<Text weight="extraBold" type="h3">
							{ensName}
						</Text>
					)}
					<Text style={{ textAlign: 'center' }}>
						{address}
					</Text>
				</View>

				<NetworkWarning.Tag />

				<WhiteButton
					title={i18n.t('Components.Buttons.share')}
					icon="shareStroke"
					onPress={onShare}
					color="cta1"
				/>
			</View>
		</SafeAreaView>
	);
};

export default ReceiveModal;
