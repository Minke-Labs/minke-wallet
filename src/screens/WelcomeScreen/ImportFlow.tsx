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
		flex: 1
		// borderColor: 'red',
		// borderWidth: 1
	}
});

const ImportFlow = () => (
	<View style={styles.container}>
		<Text
			type="h3"
			weight="extraBold"
			// style={{ borderColor: 'green', borderWidth: 4 }}
		>
			Add Wallet
		</Text>
	</View>
);

export default ImportFlow;
