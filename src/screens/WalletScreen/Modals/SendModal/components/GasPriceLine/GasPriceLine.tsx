import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { numberFormat } from '@helpers/utilities';
import { GasPriceLineProps } from './GasPriceLine.types';
import styles from './GasPriceLine.styles';

const GasPriceLine: React.FC<GasPriceLineProps> = ({ gas, label, priceUSD }) => {
	const coinValue = gas * 41000 * 10 ** -9;

	return (
		<View style={styles.container}>
			<Text color="text2" type="span">
				Speed: {label}
			</Text>
			<Text color="text2" type="span">
				{numberFormat(coinValue * priceUSD, 5)} Network Fee
			</Text>
		</View>
	);
};

export default GasPriceLine;
