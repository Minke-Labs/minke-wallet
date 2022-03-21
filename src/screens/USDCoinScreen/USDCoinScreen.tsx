import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { BasicLayout } from '@layouts';
import { Text, Icon } from '@components';
import { depositStablecoins as stablecoins, usdCoinSettingsKey, usdCoin as selectedUSDCoin } from '@models/deposit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@hooks';
import styles from './USDCoinScreen.styles';
import ListItem from './ListItem';

const USDCoinScreen = () => {
	const navigation = useNavigation();
	const [usdCoin, setUsdCoin] = useState('');

	const onSelectCoin = async (token: string) => {
		await AsyncStorage.setItem(usdCoinSettingsKey, token);
		setUsdCoin(token);
	};

	useEffect(() => {
		const fetchSelectedCoin = async () => {
			setUsdCoin(await selectedUSDCoin());
		};

		fetchSelectedCoin();
	}, []);

	return (
		<BasicLayout>
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
							<ListItem
								label={item}
								selected={usdCoin === item}
								onPress={() => onSelectCoin(item)}
								token={item}
							/>
						)}
						keyExtractor={(item) => item}
					/>
				</SafeAreaView>
			</View>
		</BasicLayout>
	);
};

export default USDCoinScreen;
