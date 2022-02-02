import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Portal, TextInput, Headline, useTheme } from 'react-native-paper';
import { useState } from '@hookstate/core';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { restoreWalletByMnemonic } from 'old/src/model/wallet';
import { globalWalletState } from 'old/src/stores/WalletStore';
import Modal from '../../../../src/components/Modal';
import PrimaryButton from '../PrimaryButton';
import { makeStyles } from './styles';
import globalStyles from '../global.styles';

const ImportWalletButton = ({ button, onImportFinished }: { button: JSX.Element; onImportFinished: () => void }) => {
	const state = useState(globalWalletState());
	const [visible, setVisible] = React.useState(false);
	const [text, setText] = React.useState('');
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const childrenWithProps = React.Children.map(button, (child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { onPress: showModal });
		}
		return child;
	});

	const onImportWallet = async () => {
		if (text.trim()) {
			try {
				const wallet = await restoreWalletByMnemonic(text.trim());
				state.set(wallet);
				hideModal();
				onImportFinished();
			} catch (error) {
				console.error('Invalid seed phrase or primary key');
			}
		}
	};

	return (
		<>
			<Portal>
				<Modal visible={visible} onCloseAll={hideModal} onDismiss={hideModal} onBack={hideModal}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={{ flex: 1 }}>
							<Headline style={globalStyles.headline}>Add Wallet</Headline>
							<View style={styles.inputContainer}>
								<TextInput
									label="Seed phrase or private key"
									style={styles.textarea}
									value={text}
									multiline
									numberOfLines={6}
									onChangeText={(t) => setText(t)}
									spellCheck={false}
									autoCapitalize="none"
									autoFocus
									autoCorrect={false}
								/>
							</View>
							<PrimaryButton disabled={!text.trim()} onPress={onImportWallet}>
								Import Wallet
							</PrimaryButton>
							<KeyboardSpacer />
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</Portal>
			{childrenWithProps}
		</>
	);
};

export default ImportWalletButton;
