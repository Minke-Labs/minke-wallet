import React, { useEffect } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState } from '@hookstate/core';
import { MinkeWallet, getAllWallets, AllMinkeWallets } from '@models/wallet';
import { WelcomeLayout } from '@layouts';
import { Text, Icon, Modal } from '@components';
import { walletState, globalWalletState } from '@src/stores/WalletStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { stablecoins } from '@models/token';
import styles from './USDCoinScreen.styles';
import ListItem from './ListItem';

const USDCoinScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const state = useState(globalWalletState());
	const [wallets, setWallets] = React.useState<AllMinkeWallets | null>();
	const { address } = state.value;

	const onSelectCoin = async (token: string) => {
		console.log(token);
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
					US Dollar coin
				</Text>
				<SafeAreaView>
					<FlatList
						style={{ paddingTop: 24, paddingBottom: 24 }}
						data={stablecoins}
						renderItem={({ item }) => (
							<ListItem label={item} selected={false} onPress={() => onSelectCoin(item)} token={item} />
						)}
						keyExtractor={(item) => item}
					/>
				</SafeAreaView>
			</View>
		</WelcomeLayout>
	);
};

export default USDCoinScreen;
