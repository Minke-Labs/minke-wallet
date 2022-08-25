import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@hooks';
import { BasicLayout } from '@layouts';
import { Expander } from '@components';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RNUxcam from 'react-native-ux-cam';
import MarketCap from './MarketCap/MarketCap';
import Balance from './Balance/Balance';
import styles from './AssetsScreen.styles';
import { Upper } from './Upper/Upper';
import { useAssetsScreen } from './AssetsScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'AssetsScreen'>;

const AssetsScreen = ({ route }: Props) => {
	const { colors } = useTheme();
	const { coin } = route.params;
	const { description, tokenVolume, marketCap } = useAssetsScreen(coin);
	RNUxcam.tagScreenName('AssetsScreen');

	return (
		<BasicLayout hideSafeAreaView bgc="detail4">
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
			>
				<SafeAreaView>

					<Upper {...{ coin }} />

					<ScrollView style={[styles.bodyContainer, { backgroundColor: colors.background1 }]}>

						{coin && <Balance coin={coin} />}

						{marketCap > 0 && !!tokenVolume && (
							<MarketCap tokenVolume={tokenVolume.total_volumes} marketCap={marketCap} />
						)}

						{!!description && (
							<Expander
								title={coin.name!}
								desc={description}
							/>
						)}

					</ScrollView>
				</SafeAreaView>
			</ScrollView>
		</BasicLayout>
	);
};

export default AssetsScreen;
