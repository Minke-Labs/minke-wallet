import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { numberFormat } from '@helpers/utilities';
import { MarketCapProps } from './MarketCap.types';
import styles from './MarketCap.styles';

const MarketCap: React.FC<MarketCapProps> = ({ marketCap }) => {
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.background2 }]}>
			<Text marginBottom={8} color="text4" type="p2">
				MarketCap
			</Text>
			<Text weight="bold" type="h3">
				{numberFormat(marketCap)}
			</Text>
		</View>
	);
};

export default MarketCap;
