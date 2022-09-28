import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { BasicLayout } from '@layouts';
import { useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { Header } from '@components';
import ListItem from './ListItem/ListItem';
import styles from './BackupSettingsScreen.styles';
import { useBackupSettingsScreen } from './BackupSettingsScreen.hooks';

const BackupSettingsScreen = () => {
	RNUxcam.tagScreenName('BackupSettingsScreen');
	const { i18n } = useLanguage();
	const { wallets, onSelectWallet } = useBackupSettingsScreen();

	return (
		<BasicLayout>
			<Header title={i18n.t('BackupSettingsScreen.title')} />

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
