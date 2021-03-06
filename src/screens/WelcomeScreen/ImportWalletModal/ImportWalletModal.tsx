import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, Button, TextArea, ModalHeader, LoadingScreen } from '@components';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { ImportWalletModalProps } from './ImportWalletModal.types';
import { useImportWalletModal } from './useImportWallet.hooks';
import { styles } from './ImportWalletModal.styles';

const ImportWalletModal: React.FC<ImportWalletModalProps> = ({ onImportFinished, onDismiss }) => {
	const { i18n } = useLanguage();
	const { text, setText, importing, onImportWallet } = useImportWalletModal({
		onImportFinished
	});

	return (
		<SafeAreaView>
			<ModalHeader {...{ onDismiss }} />
			<View style={styles.container}>
				<>
					<View style={styles.addWalletContainer}>
						<Text type="h3" weight="extraBold" marginBottom={24} width="100%">
							{i18n.t('WelcomeScreen.ImportWalletModal.add_wallet')}
						</Text>
						<View style={styles.textAreaContainer} ref={(view: any) => RNUxcam.occludeSensitiveView(view)}>
							<TextArea
								label={i18n.t('WelcomeScreen.ImportWalletModal.seed_or_key')}
								value={text}
								numberOfLines={6}
								onChangeText={(t) => setText(t)}
							/>
						</View>
						{importing ? (
							<LoadingScreen title={i18n.t('WelcomeScreen.ImportWalletModal.importing')} />
						) : (
							<Button
								disabled={!text.trim()}
								title={i18n.t('WelcomeScreen.ImportWalletModal.import')}
								onPress={onImportWallet}
								marginBottom={24}
							/>
						)}
					</View>
					<KeyboardSpacer />
				</>
			</View>
		</SafeAreaView>
	);
};

export default ImportWalletModal;
