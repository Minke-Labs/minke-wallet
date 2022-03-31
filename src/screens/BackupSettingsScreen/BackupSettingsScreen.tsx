import React from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { BasicLayout } from '@layouts';
import { Text, Icon } from '@components';
import ListItem from './ListItem/ListItem';
import styles from './BackupSettingsScreen.styles';
import { useBackupSettingsScreen } from './BackupSettingsScreen.hooks';

const BackupSettingsScreen = () => {
	const { wallets, goBack, onSelectWallet } = useBackupSettingsScreen();

	return (
		<BasicLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={goBack}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>

			<View style={styles.container}>
				<Text weight="extraBold" type="h3">
					Backup Accounts
				</Text>
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
