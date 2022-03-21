import React from 'react';
import { View } from 'react-native';
import { Text, Button, TextArea, ModalHeader, LoadingScreen } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { styles } from './ImportWalletModal.styles';
import { ImportWalletModalProps } from './ImportWalletModal.types';
import { useImportWalletModal } from './useImportWallet.hooks';

const ImportWalletModal: React.FC<ImportWalletModalProps> = ({ onImportFinished, onDismiss }) => {
	const { text, setText, importing, onImportWallet } = useImportWalletModal({ onImportFinished });

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
					<LoadingScreen title="Creating wallet" />
				) : (
					<Button disabled={!text.trim()} title="Import Wallet" onPress={onImportWallet} marginBottom={24} />
				)}
			</View>
			<KeyboardSpacer />
		</View>
	);
};

export default ImportWalletModal;
