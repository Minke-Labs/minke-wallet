import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@hooks';
import { BasicLayout } from '@layouts';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Balance from './Balance/Balance';
import MarketCap from './MarketCap/MarketCap';
import styles from './AssetsScreen.styles';
import { Upper } from './Upper/Upper';
import AboutCoin from './AboutCoin/AboutCoin';
import { useAssetsScreen } from './AssetsScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'AssetsScreen'>;

const AssetsScreen = ({ route }: Props) => {
	const { colors } = useTheme();
	const { coin } = route.params;
	const { tokenData, tokenVolume, marketCap } = useAssetsScreen(coin);

	return (
		<BasicLayout hideSafeAreaView bg="detail4">
			<ScrollView style={styles.container}>
				<SafeAreaView>
					<Upper {...{ coin }} />
					<ScrollView style={[styles.bodyContainer, { backgroundColor: colors.background1 }]}>
						<Balance {...{ coin }} />
						{marketCap > 0 && tokenVolume && (
							<MarketCap tokenVolume={tokenVolume.total_volumes} marketCap={marketCap} />
						)}
						{tokenData && <AboutCoin data={tokenData} name={coin.name} />}
					</ScrollView>
				</SafeAreaView>
			</ScrollView>
		</BasicLayout>
	);
};

export default AssetsScreen;
