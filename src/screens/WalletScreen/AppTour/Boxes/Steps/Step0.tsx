import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';

export const Step0 = () => (
	<>
		<View style={{ height: 25, flexDirection: 'row', marginBottom: 8 }}>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Welcome to Minke!
			</Text>
			<Text>🌊</Text>
		</View>
		<Text width={237} type="a">
			Your new favourite way to save on stablecoins and earn up to 5% annualized interest.
		</Text>
	</>
);
