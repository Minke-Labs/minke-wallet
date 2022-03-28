import React from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { BasicLayout } from '@layouts';
import { Text, Icon } from '@components';
import { depositStablecoins as stablecoins } from '@models/deposit';
import styles from './USDCoinScreen.styles';
import ListItem from './ListItem/ListItem';
import { useUSDCoinScreen } from './USDCoinScreen.hooks';

const USDCoinScreen = () => {
	const { usdCoin, onSelectCoin, navigation } = useUSDCoinScreen();

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
