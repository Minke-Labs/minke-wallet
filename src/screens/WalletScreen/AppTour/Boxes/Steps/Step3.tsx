import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from '@components';

export const Step3 = () => (
	<>
		<View style={{ height: 25, marginBottom: 8, flexDirection: 'row' }}>
			<Icon
				name="sendStroke"
				size={20}
				color="cta1"
				style={{ marginRight: 8 }}
			/>
			<Text
				type="p" // Change to tMedium after new values come from merge.
				weight="bold"
			>
				Send
			</Text>
		</View>
		<Text width={237} type="a">
			Send tokens to a another wallet or to an exchange like Binance or Coinbase.
		</Text>
	</>
);
