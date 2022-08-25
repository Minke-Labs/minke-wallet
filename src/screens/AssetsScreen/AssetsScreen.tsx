import React from 'react';
import { SafeAreaView } from 'react-native';
import { BasicLayout } from '@layouts';
import { Expander, View, Scroll } from '@components';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RNUxcam from 'react-native-ux-cam';
import MarketCap from './MarketCap/MarketCap';
import Balance from './Balance/Balance';
import { Upper } from './Upper/Upper';
import { useAssetsScreen } from './AssetsScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'AssetsScreen'>;

const AssetsScreen = ({ route }: Props) => {
	const { coin } = route.params;
	const { description, tokenVolume, marketCap } = useAssetsScreen(coin);
	RNUxcam.tagScreenName('AssetsScreen');

	return (
		<BasicLayout hideSafeAreaView bgc="detail4">
			<Scroll hideScroll>
				<SafeAreaView>

					<Upper {...{ coin }} />

					<View
						ph="s"
						pt="s"
						h="100%"
						bgc="background1"
						btlr="s"
						btrr="s"
					>

						{coin && <Balance coin={coin} />}

						{marketCap > 0 && !!tokenVolume && (
							<MarketCap
								tokenVolume={tokenVolume.total_volumes}
								marketCap={marketCap}
							/>
						)}

						{!!description && <Expander title={coin.name!} desc={description} />}

					</View>

				</SafeAreaView>
			</Scroll>
		</BasicLayout>
	);
};

export default AssetsScreen;
