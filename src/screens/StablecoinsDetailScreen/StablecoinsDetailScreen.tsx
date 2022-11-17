import React from 'react';
import { ScrollView } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { View, Expander, Balance } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { Header } from './Header/Header';
import ByNetworks from './ByNetworks/ByNetworks';
import { useStablecoinsDetailScreen } from './useStablecoinsDetailScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'StablecoinsDetailScreen'>;

const StablecoinsDetailScreen = ({ route }: Props) => {
	RNUxcam.tagScreenName('StablecoinsDetailScreen');
	const navigation = useNavigation();
	const { coin } = route.params;
	const {
		description
		// tokenVolume,
		// marketCap
	} = useStablecoinsDetailScreen(coin); // @@@TODO:

	return (
		<>
			<BasicLayout>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View ph="xs">
						<Header title={coin.name || ''} symbol={coin.symbol} onPress={() => navigation.goBack()} />
						<Balance coin={coin} stablecoin />
						<ByNetworks />
						{!!description && <Expander title={coin.name || ''} desc={description} />}
					</View>
				</ScrollView>
			</BasicLayout>
		</>
	);
};

export default StablecoinsDetailScreen;
