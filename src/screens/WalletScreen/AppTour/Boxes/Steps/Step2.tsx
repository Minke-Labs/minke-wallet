import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from '@components';

export const Step2 = () => (
	<>
		<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
			<Icon
				name="saveStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Save
			</Text>
		</View>
		<Text width={237} type="a">
			Get up to 5% anual interest on stable coins with
			<Text type="a" weight="bold"> mStable</Text> or <Text type="a" weight="bold">Aave.</Text>
		</Text>
	</>
);
