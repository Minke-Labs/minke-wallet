import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from '@components';
import { styles } from './Warning.styles';

const Warning = ({ label }: { label: string }) => (
	<View style={styles.container}>
		<View style={styles.iconContainer}>
			<Icon name="attention" color="alert4a" size={32} />
		</View>
		<Text type="a" style={styles.text}>
			{label}
		</Text>
	</View>
);

export default Warning;
