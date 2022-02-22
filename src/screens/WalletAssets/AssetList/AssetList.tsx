import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@components';

const AssetList = () => (
	<View style={{ paddingTop: 32 }}>
		<View
			style={{
				borderWidth: 1,
				borderColor: 'red',
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
	</View>
);

export default AssetList;
