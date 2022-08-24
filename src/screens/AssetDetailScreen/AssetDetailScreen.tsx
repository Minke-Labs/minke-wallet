/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { ScrollView } from 'react-native';
import { View } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { Header } from './Header/Header';
import { Balance } from './Balance/Balance';
import ByNetworks from './ByNetworks/ByNetworks';
import About from './About/About';
import { useAssetDetailScreen } from './AssetDetailScreen.hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'AssetDetailScreen'>;

const AssetDetailScreen = ({ route }: Props) => {
	const navigation = useNavigation();
	const { coin } = route.params;
	const { description, tokenVolume, marketCap } = useAssetDetailScreen(coin);

	return (
		<BasicLayout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View ph="xs">
					<Header onPress={() => navigation.goBack()} />
					<Balance coin={coin} />
					<ByNetworks />
					<About title={coin.name} desc={description} />
				</View>
			</ScrollView>
		</BasicLayout>
	);
};

export default AssetDetailScreen;
