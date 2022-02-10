/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import { useState } from '@hookstate/core';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextArea } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { globalWalletState } from '@src/stores/WalletStore';
import { restoreWalletByMnemonic } from '@src/model/wallet';

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

interface ImportFlowProps {
	onImportFinished: () => void;
}

const ImportFlow: React.FC<ImportFlowProps> = ({ onImportFinished }) => {
	const [text, setText] = React.useState('');
	const state = useState(globalWalletState());

	const onImportWallet = async () => {
		if (text.trim()) {
			try {
				const wallet = await restoreWalletByMnemonic(text.trim());
				state.set(wallet);
				onImportFinished();
			} catch (error) {
				console.error('Invalid seed phrase or primary key');
			}
		}
	};

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
			<Button disabled={!text.trim()} title="Import Wallet" onPress={onImportWallet} marginBottom={24} />
			<KeyboardSpacer />
		</View>
	);
};

export default ImportFlow;
