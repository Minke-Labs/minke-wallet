import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { SettingsHeader } from '@components';
import { useLanguage } from '@hooks';
import { depositStablecoins as stablecoins } from '@models/deposit';
import styles from './USDCoinScreen.styles';
import ListItem from './ListItem/ListItem';
import { useUSDCoinScreen } from './USDCoinScreen.hooks';

const USDCoinScreen = () => {
	RNUxcam.tagScreenName('USDCoinScreen');
	const { i18n } = useLanguage();
	const { usdCoin, onSelectCoin, goBack } = useUSDCoinScreen();

	return (
		<BasicLayout>
			<SettingsHeader
				title={i18n.t('USDCoinScreen.usd_asset')}
				onPress={goBack}
			/>

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
