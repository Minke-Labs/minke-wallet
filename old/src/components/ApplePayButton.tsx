import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent, Text } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000000',
		borderRadius: 8,
		padding: 16,
		marginTop: 16,
		marginBottom: 16
	},
	containerText: {
		color: '#FFFFFF',
		textAlign: 'center',
		fontSize: 20
	}
});

const ApplePayButton = ({ onPress }: { onPress?: ((event: GestureResponderEvent) => void) | undefined }) => (
	<TouchableOpacity style={styles.container}>
		<Text style={styles.containerText}>
			Pay with <Text style={{ color: '#FFFFFF', fontSize: 24 }}></Text> Pay
		</Text>
	</TouchableOpacity>
);

export default ApplePayButton;
