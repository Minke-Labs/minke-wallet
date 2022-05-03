import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { numberFormat } from '@helpers/utilities';
import { useLanguage } from '@hooks';
import { GasPriceLineProps } from './GasPriceLine.types';
import styles from './GasPriceLine.styles';

const GasPriceLine: React.FC<GasPriceLineProps> = ({ gas, label, priceUSD }) => {
	const { i18n } = useLanguage();
	const coinValue = gas * 41000 * 10 ** -9;

	return (
		<View style={styles.container}>
			<Text color="text2" type="span">
				{i18n.t('WalletScreen.Modals.SendModal.components.GasPriceLine.speed')}{label}
			</Text>
			<Text color="text2" type="span">
				{numberFormat(coinValue * priceUSD, 5)}
				{i18n.t('WalletScreen.Modals.SendModal.components.GasPriceLine.network_fee')}
			</Text>
		</View>
	);
};

export default GasPriceLine;
