import React, { useEffect } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState } from '@hookstate/core';
import { MinkeWallet, getAllWallets, AllMinkeWallets } from '@models/wallet';
import { BasicLayout } from '@layouts';
import { Text, Icon, Modal } from '@components';
import { walletState, globalWalletState } from '@src/stores/WalletStore';
import { useNavigation } from '@hooks';
import styles from './AccountsScreen.styles';
import ListItem from './ListItem';
import ImportFlow from '../WelcomeScreen/ImportWalletModal/ImportWalletModal';

const AccountsScreen = () => {
	const navigation = useNavigation();

	const state = useState(globalWalletState());
	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();
	const [isModalVisible, setModalVisible] = React.useState(false);
	const { address } = state.value;

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets(await getAllWallets());
		};
		fetchWallets();
	}, [address]);

	const onSelectWallet = async (wallet: MinkeWallet) => {
		state.set(await walletState(wallet));
		navigation.navigate('WalletScreen');
	};

	return (
		<BasicLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={() => setModalVisible(true)}>
					<Text weight="medium" color="text7" type="a">
						Import
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.container}>
				<Text weight="extraBold" type="h3">
					Accounts
				</Text>
				<SafeAreaView>
					<FlatList
						style={{ paddingTop: 24, paddingBottom: 24 }}
						data={Object.values(wallets || {})}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<ListItem
								label={item.address}
								selected={item.address === address}
								onPress={() => onSelectWallet(item)}
								token={item.network}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</SafeAreaView>
			</View>
			<Modal isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				<ImportFlow
					visible={isModalVisible}
					onImportFinished={() => navigation.navigate('WalletScreen')}
					onDismiss={() => setModalVisible(false)}
				/>
			</Modal>
		</BasicLayout>
	);
};

export default AccountsScreen;
