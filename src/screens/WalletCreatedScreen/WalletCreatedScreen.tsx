import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { BasicLayout } from '@layouts';
import { walletCreatedImg } from '@images';
import { Text, Button, ScreenLoadingIndicator, LoadingScreen, Modal, ModalReusables } from '@components';
import { iCloudBackup } from '@hooks';
import styles from './WalletCreatedScreen.styles';
import { useWalletCreatedScreen } from './WalletCreatedScreen.hooks';

const WalletCreatedScreen = () => {
	const { backupManually, seed, walletId } = useWalletCreatedScreen();
	const [error, setError] = React.useState<string | undefined>();
	const { handleIcloudBackup, isWalletLoading, backupError } = iCloudBackup(walletId || '');

	useEffect(() => {
		setError(backupError);
	}, [backupError]);

	if (seed.promised) return <ScreenLoadingIndicator />;

	if (isWalletLoading) return <LoadingScreen title={isWalletLoading} />;

	return (
		<>
			<BasicLayout>
				<View style={styles.container}>
					<Image source={walletCreatedImg} style={styles.image} />

					<View style={styles.textContainer}>
						<Text center weight="extraBold" type="h2" marginBottom={16}>
							Wallet created!
						</Text>
						<Text center color="text2" width={258}>
							You need to create a backup of your wallet. Keep your backup safe as losing it could mean a
							loss of funds.
						</Text>
					</View>

					<View style={styles.buttonContainer}>
						<Button
							title="Back up to iCloud"
							iconRight="cloudStroke"
							onPress={handleIcloudBackup}
							marginBottom={14}
						/>
						<Button title="Back up manually" mode="text" onPress={backupManually} />
					</View>
				</View>
			</BasicLayout>
			<Modal isVisible={!!error} onDismiss={() => setError(undefined)}>
				<ModalReusables.Error onDismiss={() => setError(undefined)} title="Backup error" description={error} />
			</Modal>
		</>
	);
};

export default WalletCreatedScreen;
