import React from 'react';
import {
	View,
	// Text,
	StyleSheet
	// Dimensions
} from 'react-native';
// const screen = Dimensions.get('screen');
import { Text } from '@components';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center'
	},
	box: {
		width: 327,
		height: 110,
		borderColor: 'green',
		borderWidth: 4,
		borderRadius: 4
	}
});

const ImportFlow = () => (
	<View style={styles.container}>
		<Text type="h3" weight="extraBold" style={{ borderColor: 'orangered', borderWidth: 2 }} width="100%">
			Add Wallet
		</Text>
		<View style={styles.box} />
	</View>
);

export default ImportFlow;
