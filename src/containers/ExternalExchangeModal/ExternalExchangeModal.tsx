/* eslint-disable @typescript-eslint/no-unused-vars */
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
			<Text width="100%" weight="bold" type="hMedium">External exchange</Text>
			<Text width="100%" type="bMedium" marginBottom={16}>
				Send from Binance, Coinbase, Kraken or another centralized exchange.
			</Text>
			<Text width="100%" type="bMedium" color="alert1" marginBottom={56}>
				*Make sure the network selected is{' '}
				<Text type="bMedium" color="alert1" weight="bold">
					{network?.name}.
				</Text>
			</Text>
			<View style={styles.container}>
				<QRCode
					value={address}
					size={216}
					color="#34769D"
				/>
			</View>
			<Text marginBottom={16}>or</Text>
			<WhiteButton
				// title={i18n.t('Components.Buttons.share')}
				title="Copy wallet address"
				icon="copy"
				color="cta1"
				onPress={onShare}
			/>
		</View>
	);
};
