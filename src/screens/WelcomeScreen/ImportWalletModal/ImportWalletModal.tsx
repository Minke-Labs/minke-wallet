import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, Button, TextArea, ModalHeader, LoadingScreen } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useFormProgress, useNavigation } from '@hooks';
import { ImportWalletModalProps } from './ImportWalletModal.types';
import { useImportWalletModal } from './useImportWallet.hooks';
import SelectImportMethodModal from './SelectImportMethodModal/SelectImportMethodModal';
import { styles } from './ImportWalletModal.styles';

const ImportWalletModal: React.FC<ImportWalletModalProps> = ({ onImportFinished, onDismiss, visible }) => {
	const { currentStep, reset, goForward, goBack } = useFormProgress();
	const { text, setText, importing, onImportWallet } = useImportWalletModal({ onImportFinished });
	const navigation = useNavigation();

	const onICloudBackup = () => {
		navigation.navigate('BackupToICloudScreen', { missingPassword: false, restoreBackups: true });
	};

	const onBack = () => {
		if (currentStep === 0) {
			onDismiss();
		} else {
			goBack();
		}
	};

	useEffect(() => {
		if (!visible) {
			reset();
		}
	}, [visible]);

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} onBack={onBack} />
			<View style={styles.container}>
				{currentStep === 0 && (
					<SelectImportMethodModal onImportWithSecret={goForward} onICloudBackup={onICloudBackup} />
				)}
				{currentStep === 1 && (
					<>
						<View style={styles.addWalletContainer}>
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
								<LoadingScreen title="Importing wallet" />
							) : (
								<Button
									disabled={!text.trim()}
									title="Import Wallet"
									onPress={onImportWallet}
									marginBottom={24}
								/>
							)}
						</View>
						<KeyboardSpacer />
					</>
				)}
			</View>
		</SafeAreaView>
	);
};

export default ImportWalletModal;
