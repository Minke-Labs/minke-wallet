/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextArea } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingHorizontal: 24
	},
	textAreaContainer: {
		width: '100%',
		height: 110,
		marginBottom: 24
	},
	textarea: {
		borderRadius: 24,
		height: 104,
		overflow: 'hidden',
		borderWidth: 1,
		paddingHorizontal: 24
	}
});

const ImportFlow = () => {
	const [text, setText] = useState('');

	return (
		<View style={styles.container}>
			<Text type="h3" weight="extraBold" marginBottom={24} width="100%">
				Add Wallet
			</Text>
			<View style={styles.textAreaContainer}>
				<TextArea
					label="Seed phrase or private key"
					value={text}
					numberOfLines={6}
					onChangeText={(t) => setText(t)}
				/>
			</View>
			<Button
				disabled={!text.trim()}
				title="Import Wallet"
				onPress={() => console.log('Import Wallet!')}
				marginBottom={24}
			/>
			<KeyboardSpacer />
		</View>
	);
};

export default ImportFlow;
