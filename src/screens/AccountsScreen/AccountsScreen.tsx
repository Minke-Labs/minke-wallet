import React, { useEffect } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState } from '@hookstate/core';
import { MinkeWallet, getAllWallets, AllMinkeWallets } from '@models/wallet';
import { WelcomeLayout } from '@layouts';
import { Text, Icon } from '@components';
import { walletState, globalWalletState, setPrimaryWallet } from '@src/stores/WalletStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import styles from './AccountsScreen.styles';
import ListItem from './ListItem';

const AccountsScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const state = useState(globalWalletState());
	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();
	const { address } = state.value;

	useEffect(() => {
		const fetchWallets = async () => {
			setWallets(await getAllWallets());
		};
		fetchWallets();
	}, [address]);

	const onSelectWallet = async (wallet: MinkeWallet) => {
		state.set(walletState(wallet));
	};

	return (
		<WelcomeLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
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
		</WelcomeLayout>
	);
};

export default AccountsScreen;
