import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Text from '@src/components/Text/Text';
import { numberFormat } from '@helpers/utilities';
import { useLanguage } from '@hooks';
import { getEthLastPrice } from '@models/wallet';
import gasLimits from '@models/gas';
import { GasPriceLineProps } from './GasPriceLine.types';
import styles from './GasPriceLine.styles';

const GasPriceLine: React.FC<GasPriceLineProps> = ({ gas, label, priceUSD, network }) => {
	const { i18n } = useLanguage();
	const coinValue = gas * gasLimits.send * 10 ** -9;
	const [usdPrice, setUsdPrice] = useState(priceUSD);

	useEffect(() => {
		const fetchUsdPrice = async () => {
			if (!priceUSD) {
				const {
					result: { ethusd }
				} = await getEthLastPrice(network);
				setUsdPrice(+ethusd);
			}
		};

		fetchUsdPrice();
	}, []);

	return (
		<View style={styles.container}>
			<Text color="text2" type="span">
				{i18n.t('Components.ModalReusables.SendModal.components.GasPriceLine.speed')}
				{label}
			</Text>
			<Text color="text2" type="span">
				{numberFormat(coinValue * usdPrice, 5)}
				{i18n.t('Components.ModalReusables.SendModal.components.GasPriceLine.network_fee')}
			</Text>
		</View>
	);
};

export default GasPriceLine;
