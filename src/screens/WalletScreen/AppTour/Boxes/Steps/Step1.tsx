import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from '@components';

export const Step1 = () => (
	<>
		<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
			<Icon
				name="addStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Add funds
			</Text>
		</View>
		<Text width={237} type="a">
			You can buy USDC in 3 clicks with
			Apple Pay or your local payment solution.
		</Text>
	</>
);
