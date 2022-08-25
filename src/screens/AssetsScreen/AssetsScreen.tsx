import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { BasicLayout } from '@layouts';
import { spacing } from '@styles';
import { Expander, View } from '@components';
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
			<ScrollView showsVerticalScrollIndicator={false}>

				<SafeAreaView>

					<Upper {...{ coin }} />

					<View
						ph="s"
						pt="s"
						bgc="background1"
						style={{
							borderTopLeftRadius: spacing.s,
							borderTopRightRadius: spacing.s,
							overflow: 'hidden'
						}}
					>
						<ScrollView style={{ width: '100%', height: '100%' }}>

							{coin && <Balance coin={coin} />}

							{marketCap > 0 && !!tokenVolume && (
								<MarketCap tokenVolume={tokenVolume.total_volumes} marketCap={marketCap} />
							)}

							{!!description && <Expander title={coin.name!} desc={description} />}

						</ScrollView>
					</View>

				</SafeAreaView>

			</ScrollView>
		</BasicLayout>
	);
};

export default AssetsScreen;
