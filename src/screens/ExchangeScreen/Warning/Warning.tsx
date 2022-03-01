import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from '@components';

const Warning = ({ label }: { label: string }) => (
	<View
		style={{
			flexDirection: 'row',
			borderRadius: 16,
			marginBottom: 32,
			borderColor: '#FFFCF5',
			borderWidth: 1
		}}
	>
		<View
			style={{
				backgroundColor: '#FFFCF5',
				paddingVertical: 20,
				paddingHorizontal: 12,
				borderTopLeftRadius: 16,
				borderBottomLeftRadius: 16
			}}
		>
			<Icon name="alertStroke" color="alert4a" size={32} />
		</View>
		<Text type="a" style={{ paddingVertical: 10, paddingHorizontal: 16, alignSelf: 'center' }}>
			{label}
		</Text>
	</View>
);

export default Warning;
