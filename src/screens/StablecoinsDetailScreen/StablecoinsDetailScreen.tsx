import React from 'react';
import { ScrollView } from 'react-native';
import { View, Expander } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { Header } from './Header/Header';
import Balance from './Balance/Balance';
// import ByNetworks from './ByNetworks/ByNetworks';
import { useStablecoinsDetailScreen } from './useStablecoinsDetailScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'StablecoinsDetailScreen'>;

const StablecoinsDetailScreen = ({ route }: Props) => {
	const navigation = useNavigation();
	const { coin } = route.params;
	const {
		description
		// tokenVolume,
		// marketCap
	} = useStablecoinsDetailScreen(coin); // @@@TODO:

	return (
		<BasicLayout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View ph="xs">
					<Header onPress={() => navigation.goBack()} />
					<Balance coin={coin} />
					{/* <ByNetworks /> */}
					{description && <Expander title={coin.name || ''} desc={description} />}
				</View>
			</ScrollView>
		</BasicLayout>
	);
};

export default StablecoinsDetailScreen;
