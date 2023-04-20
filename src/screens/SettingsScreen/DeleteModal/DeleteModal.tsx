import React from 'react';
import { Alert } from 'react-native';

import { Button, ModalHeader, Text, View } from '@components';
import { useAuthentication, useLanguage, useNavigation, useWalletState } from '@hooks';
import { useState } from '@hookstate/core';
import { deletePrivateKey, getAllWallets, walletDelete } from '@models/wallet';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import { emptyWallet, globalWalletState, walletState } from '@stores/WalletStore';

interface DeleteModalProps {
	onDismiss: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onDismiss }) => {
	const { i18n } = useLanguage();
	const { accountName } = useWalletState();
	const navigation = useNavigation();
	const { showAuthenticationPrompt } = useAuthentication();
	const state = useState(globalWalletState());

	const onDeleteWallet = () => {
		onDismiss();
		Alert.alert(i18n.t('SettingsScreen.DeleteModal.are_you_sure'), '', [
			{
				text: i18n.t('SettingsScreen.DeleteModal.cancel'),
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

							await deletePrivateKey(address);

							if (wallets.length > 0) {
								state.set(await walletState(wallets[0]));
								navigation.navigate('HomeScreen');
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
			<View ph="xs">
				<Text type="hMedium" weight="bold" mb="s">
					{i18n.t('SettingsScreen.DeleteModal.delete_wallet')}
				</Text>
				<Text type="tSmall" weight="bold" mb="xxs">
					{i18n.t('SettingsScreen.DeleteModal.are_you_sure')} ({accountName})
				</Text>
				<Text mb="m">{i18n.t('SettingsScreen.DeleteModal.recover', { os: cloudPlatform })}</Text>

				<View row mb="xxxl">
					<View flex1>
						<Button
							title={i18n.t('SettingsScreen.DeleteModal.delete_wallet')}
							onPress={onDeleteWallet}
							mode="outlined"
							alert
						/>
					</View>
					<View mr="s" />
					<View flex1>
						<Button title={i18n.t('SettingsScreen.DeleteModal.keep_wallet')} onPress={onDismiss} />
					</View>
				</View>
			</View>
		</View>
	);
};

export default DeleteModal;
