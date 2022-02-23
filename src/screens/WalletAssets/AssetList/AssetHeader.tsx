/* eslint-disable no-console */
import React from 'react';
import { Text, Icon } from '@components';
import { View, TouchableOpacity } from 'react-native';

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
		<TouchableOpacity onPress={() => console.log('Searching...')}>
			<Icon name="searchStroke" size={24} color="text7" />
		</TouchableOpacity>
	</View>
);

export default AssetHeader;
