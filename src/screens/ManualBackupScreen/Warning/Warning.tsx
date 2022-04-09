import { View } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks';
import { Icon, Text } from '@components';

const Warning = () => {
	const { colors } = useTheme();

	return (
		<View
			style={{
				height: 50,
				padding: 8,
				borderRadius: 8,
				borderWidth: 1,
				borderColor: colors.alert4a,
				backgroundColor: colors.background4,
				flexDirection: 'row',
				marginBottom: 25
			}}
		>
			<Icon name="attention" size={24} color="alert4a" style={{ marginRight: 8 }} />
			<View style={{ justifyContent: 'space-between' }}>
				<Text type="span" weight="bold">
					Minke will never ask for these words
				</Text>
				<Text type="span">Anyone who has these can access your wallet!</Text>
			</View>
		</View>
	);
};

export default Warning;
