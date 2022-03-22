import React from 'react';
import { Image, View } from 'react-native';
import { BasicLayout } from '@layouts';
import { walletCreatedImg } from '@images';
import { Text, Button, ScreenLoadingIndicator } from '@components';
import styles from './WalletCreatedScreen.styles';
import { useWalletCreatedScreen } from './WalletCreatedScreen.hooks';

const WalletCreatedScreen = () => {
	const { backupManually, seed, backupOnKeychain } = useWalletCreatedScreen();

	if (seed.promised) return <ScreenLoadingIndicator />;

	return (
		<BasicLayout>
			<View style={styles.container}>
				<Image source={walletCreatedImg} style={styles.image} />

				<View style={styles.textContainer}>
					<Text center weight="extraBold" type="h2" marginBottom={16}>
						Wallet created!
					</Text>
					<Text center color="text2" width={250}>
						You need to create a backup of your wallet. Keep your backup safe as losing it could mean a loss
						of funds.
					</Text>
				</View>

				<View style={styles.buttonContainer}>
					<Button
						title="Back up to iCloud"
						iconRight="cloudStroke"
						onPress={backupOnKeychain}
						marginBottom={14}
					/>
					<Button title="Back up manually" mode="text" onPress={backupManually} />
				</View>
			</View>
		</BasicLayout>
	);
};

export default WalletCreatedScreen;
