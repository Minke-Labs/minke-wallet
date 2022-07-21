import React from 'react';
import { View, Alert } from 'react-native';
import { walletState, emptyWallet } from '@stores/WalletStore';
import { walletDelete, getAllWallets, deletePrivateKey } from '@models/wallet';
import { useAuthentication, useLanguage, useNavigation, useWalletState } from '@hooks';
import { Text, ModalHeader, Button } from '@components';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

interface DeleteModalProps {
	onDismiss: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onDismiss }) => {
	const { i18n } = useLanguage();
	const { state, accountName } = useWalletState();
	const navigation = useNavigation();
	const { showAuthenticationPrompt } = useAuthentication();
	const connector = useWalletConnect();
	const { connected, accounts } = connector;

	const onDeleteWallet = () => {
		Alert.alert(i18n.t('WalletScreen.ActionPanel.are_you_sure'), '', [
			{
				text: i18n.t('WalletScreen.ActionPanel.cancel'),
				style: 'cancel'
			},
			{
				text: 'OK',
				onPress: () => {
					showAuthenticationPrompt({
						onSuccess: async () => {
							await walletDelete(state.value?.walletId || '');
							const allWallets = (await getAllWallets()) || {};
							const wallets = Object.values(allWallets);

							const { address } = state.value;

							if (connected && accounts[0] === address) {
								connector.killSession();
							}
							await deletePrivateKey(address);

							if (wallets.length > 0) {
								state.set(await walletState(wallets[0]));
								navigation.navigate('WalletScreen');
							} else {
								state.set(emptyWallet);
								navigation.navigate('WelcomeScreen');
							}
						}
					});
				}
			}
		]);
	};

	return (
		<View>
			<ModalHeader {...{ onDismiss }} />
			<View style={{ paddingHorizontal: 16 }}>
				<Text type="hMedium" weight="bold" marginBottom={24}>
					{i18n.t('SettingsScreen.DeleteModal.delete_wallet')}
				</Text>
				<Text type="tSmall" weight="bold" marginBottom={8}>
					{i18n.t('SettingsScreen.DeleteModal.are_you_sure')} ({accountName})
				</Text>
				<Text marginBottom={32}>{i18n.t('SettingsScreen.DeleteModal.recover', { os: cloudPlatform })}</Text>

				<View style={{ flexDirection: 'row', marginBottom: 62 }}>
					<View style={{ flex: 1 }}>
						<Button
							title={i18n.t('SettingsScreen.DeleteModal.delete_wallet')}
							onPress={onDeleteWallet}
							mode="outlined"
							alert
						/>
					</View>
					<View style={{ width: 24 }} />
					<View style={{ flex: 1 }}>
						<Button title={i18n.t('SettingsScreen.DeleteModal.keep_wallet')} onPress={onDismiss} />
					</View>
				</View>
			</View>
		</View>
	);
};

export default DeleteModal;
