import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { BasicLayout } from '@layouts';
import { SettingsHeader } from '@components';
import { depositStablecoins as stablecoins } from '@models/deposit';
import styles from './USDCoinScreen.styles';
import ListItem from './ListItem/ListItem';
import { useUSDCoinScreen } from './USDCoinScreen.hooks';

const USDCoinScreen = () => {
	const { usdCoin, onSelectCoin, goBack } = useUSDCoinScreen();

	return (
		<BasicLayout>
			<SettingsHeader title="USD Asset" onPress={goBack} />

			<View style={styles.container}>
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
