import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { BasicLayout } from '@layouts';
import { SettingsHeader } from '@components';
import i18n from '@localization';
import ListItem from './ListItem/ListItem';
import styles from './BackupSettingsScreen.styles';
import { useBackupSettingsScreen } from './BackupSettingsScreen.hooks';

const BackupSettingsScreen = () => {
	const { wallets, goBack, onSelectWallet } = useBackupSettingsScreen();

	return (
		<BasicLayout>
			<SettingsHeader title={i18n.t('BackupSettingsScreen.title')} onPress={goBack} done={false} />

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
