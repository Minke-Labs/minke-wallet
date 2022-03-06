import React from 'react';
import { Text } from '@components';
import { View } from 'react-native';
import styles from './Header.styles';

const AssetHeader = () => (
	<View style={styles.container}>
		<Text weight="extraBold">Asset</Text>
	</View>
);

export default AssetHeader;
