import React from 'react';
import { View, Share } from 'react-native';
import { Text, WhiteButton } from '@components';
import QRCode from 'react-native-qrcode-svg';
import { useLanguage, useNetwork, useWalletState } from '@hooks';
import styles from './ExternalExchangeModal.styles';

export const ExternalExchangeModal = () => {
	const { network } = useNetwork();
	const { state } = useWalletState();
	const { i18n } = useLanguage();
	const { address } = state.value;

	const onShare = async () => {
		await Share.share({ message: address });
	};

	return (
		<View style={{ alignItems: 'center' }}>
			<Text width="100%" weight="bold" type="hMedium">
				{i18n.t('Containers.AddFunds.ExternalExchangeModal.external')}
			</Text>
			<Text width="100%" type="bMedium" marginBottom={16}>
				{i18n.t('Containers.AddFunds.ExternalExchangeModal.send_from')}
			</Text>
			<Text width="100%" type="bMedium" color="alert1" marginBottom={24}>
				{i18n.t('Containers.AddFunds.ExternalExchangeModal.make_sure')}{' '}
				<Text type="bMedium" color="alert1" weight="bold">
					{network?.name}.
				</Text>
			</Text>
			<View style={styles.container}>
				<QRCode
					value={address}
					size={160}
					color="#34769D"
				/>
			</View>
			<Text>{i18n.t('Containers.AddFunds.ExternalExchangeModal.or')}</Text>
			<WhiteButton
				title={i18n.t('Containers.AddFunds.ExternalExchangeModal.copy')}
				icon="copy"
				color="cta1"
				onPress={onShare}
			/>
		</View>
	);
};
