import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { BasicLayout } from '@layouts';
import { useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { Header } from '@components';
import ListItem from './ListItem/ListItem';
import styles from './BackupSettingsScreen.styles';
import { cloudPlatform } from '@src/hooks/useWalletCloudBackup';
import { useBackupSettingsScreen } from './BackupSettingsScreen.hooks';
import useImportWalletScreen from '../ImportWalletScreen/ImportWalletScreen.hooks';

const BackupSettingsScreen = () => {
	RNUxcam.tagScreenName('BackupSettingsScreen');
	const { i18n } = useLanguage();
	const { wallets, onSelectWallet } = useBackupSettingsScreen();
	const { onICloudBackup } = useImportWalletScreen();

	return (
		<BasicLayout>
			<Header
				title={i18n.t('BackupSettingsScreen.title')}
				rightAction={i18n.t('ImportWalletScreen.restore_from_icloud', { cloudPlatform })}
				onRightActionClick={onICloudBackup}
			/>

			<View style={styles.container}>
				<SafeAreaView>
					<FlatList
						style={{ paddingTop: 24, paddingBottom: 24 }}
						data={Object.values(wallets || {})}
						renderItem={({ item: { address: walletAddress, backedUp, id } }) => (
							<ListItem label={walletAddress} backedUp={!!backedUp} onPress={() => onSelectWallet(id)} />
						)}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item) => item.id}
					/>
				</SafeAreaView>
			</View>
		</BasicLayout>
	);
};

export default BackupSettingsScreen;
