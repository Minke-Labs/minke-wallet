/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@hooks';
import Chart from './Chart/Chart';
import Balance from './Balance/Balance';
import MarketCap from './MarketCap';

const AssetsScreen = () => {
	const { colors } = useTheme();

	return (
		<ScrollView style={{ flex: 1, backgroundColor: colors.detail4 }}>
			<SafeAreaView>
				<Chart />
				<ScrollView
					style={{
						width: '100%',
						height: '100%',
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24,
						paddingHorizontal: 24,
						paddingTop: 32,
						backgroundColor: colors.background1
					}}
				>
					<Balance />
					<MarketCap />
				</ScrollView>
			</SafeAreaView>
		</ScrollView>
	);
};

export default AssetsScreen;
