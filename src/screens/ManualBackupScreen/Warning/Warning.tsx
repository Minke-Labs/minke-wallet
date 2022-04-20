import { View } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks';
import { Icon, Text } from '@components';
import styles from './Warning.styles';

const Warning = () => {
	const { colors } = useTheme();

	return (
		<View style={[styles.container, { borderColor: colors.alert6, backgroundColor: colors.background4 }]}>
			<Icon name="attention" size={24} color="alert6" style={{ marginRight: 8 }} />
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
