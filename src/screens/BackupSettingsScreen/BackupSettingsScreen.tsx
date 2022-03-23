import React, { useEffect } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState } from '@hookstate/core';
import { getAllWallets, AllMinkeWallets } from '@models/wallet';
import { BasicLayout } from '@layouts';
import { Text, Icon } from '@components';
import { globalWalletState } from '@src/stores/WalletStore';
import { useNavigation } from '@hooks';
import ListItem from './ListItem';
import styles from './BackupSettingsScreen.styles';

const BackupSettingsScreen = () => {
	const navigation = useNavigation();

	const state = useState(globalWalletState());
	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();
	const { address } = state.value;

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets(await getAllWallets());
		};
		fetchWallets();
	}, [address]);

	const onSelectWallet = async (walletId: string) => {
		navigation.navigate('BackupStatusScreen', { walletId });
	};

	return (
		<BasicLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
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
