import React from 'react';
import { useState } from '@hookstate/core';
import { View, Keyboard } from 'react-native';
import { useTheme } from '@hooks';
import { Text, Button, TextArea, ModalHeader } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { globalWalletState, walletState } from '@src/stores/WalletStore';
import { restoreWalletByMnemonic } from '@src/model/wallet';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from './ImportWalletModal.styles';
import { ImportWalletModalProps } from './ImportWalletModal.types';

const ImportWalletModal: React.FC<ImportWalletModalProps> = ({ onImportFinished, onDismiss }) => {
	const [text, setText] = React.useState('');
	const [importing, setImporting] = React.useState(false);
	const state = useState(globalWalletState());
	const { colors } = useTheme();

	const onImportWallet = async () => {
		if (text.trim()) {
			Keyboard.dismiss();
			try {
				setImporting(true);
				const wallet = await restoreWalletByMnemonic(text.trim());
				state.set(await walletState(wallet));
				setImporting(false);
				onImportFinished();
			} catch (error) {
				setImporting(false);
				console.error('Invalid seed phrase or primary key');
			}
		}
	};

	return (
		<View style={styles.container}>
			<ModalHeader {...{ onDismiss }} />
			<View style={{ alignItems: 'center' }}>
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
				{importing ? (
					<ActivityIndicator animating color={colors.text7} />
				) : (
					<Button disabled={!text.trim()} title="Import Wallet" onPress={onImportWallet} marginBottom={24} />
				)}
			</View>
			<KeyboardSpacer />
		</View>
	);
};

export default ImportWalletModal;
