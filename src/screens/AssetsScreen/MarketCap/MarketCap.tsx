import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { numberFormat } from '@helpers/utilities';
import { MarketCapProps } from './MarketCap.types';
import styles from './MarketCap.styles';

const MarketCap: React.FC<MarketCapProps> = ({ marketCap, tokenVolume }) => {
	const { colors } = useTheme();
	const lastVolume = tokenVolume[tokenVolume.length - 1][1];
	return (
		<View style={[styles.container, { backgroundColor: colors.background2 }]}>
			<View style={styles.box}>
				<Text marginBottom={8} color="text4" type="p2">
					MarketCap
				</Text>
				<Text weight="bold" type="h3" marginBottom={16}>
					{numberFormat(marketCap)}
				</Text>
			</View>
			<View style={{ height: 1, backgroundColor: colors.background1 }} />
			<View style={styles.box}>
				<Text marginBottom={8} color="text4" type="p2">
					Volume (1D)
				</Text>
				<Text weight="bold" type="h3" marginBottom={16}>
					{numberFormat(lastVolume)}
				</Text>
			</View>
		</View>
	);
};

export default MarketCap;
