import React from 'react';
import { View } from 'react-native';
import { deviceWidth } from '@styles';
import Box from '../../Box/Box';
import BlankLayout from '../../BlankLayout/BlankLayout';

const Deposit = () => (
	<BlankLayout title="Deposit">
		<View style={{ marginTop: 32, marginBottom: 32 }}>
			<Box w={deviceWidth - 32} h={228} br={16} />
		</View>
		<View
			style={{
				marginBottom: 8,
				paddingLeft: 16,
				width: '100%',
				flexDirection: 'row'
			}}
		>
			<Box w={343} h={75} br={16} style={{ marginRight: 8 }} />
			<Box w={343} h={75} br={16} />
		</View>
		<Box mb={8} w={56} h={16} br={16} />
	</BlankLayout>
);

export default Deposit;
