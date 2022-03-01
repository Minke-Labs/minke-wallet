/* eslint-disable no-console */
import React from 'react';
import { Text } from '@components';
import { View } from 'react-native';

const AssetHeader = () => (
	<View
		style={{
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 24,
			marginBottom: 16
		}}
	>
		<Text weight="extraBold">Asset</Text>
	</View>
);

export default AssetHeader;
