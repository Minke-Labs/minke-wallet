import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { numberFormat } from '@helpers/utilities';

interface MarketCapProps {
	marketCap: number;
}

const MarketCap: React.FC<MarketCapProps> = ({ marketCap }) => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				width: '100%',
				height: 97,
				borderRadius: 16,
				paddingTop: 16,
				paddingHorizontal: 24,
				backgroundColor: colors.background2
			}}
		>
			<Text marginBottom={8} color="text4" style={{ fontSize: 16, lineHeight: 19 }}>
				MarketCap
			</Text>
			<Text
				weight="bold"
				style={{
					fontSize: 22,
					lineHeight: 36
				}}
			>
				{numberFormat(marketCap)}
			</Text>
		</View>
	);
};

export default MarketCap;
