import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@hooks';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Chart from './Chart/Chart';
import Balance from './Balance/Balance';
import MarketCap from './MarketCap';
import Header from './Header';

type Props = NativeStackScreenProps<RootStackParamList, 'Assets'>;

const AssetsScreen = ({ route }: Props) => {
	const { colors } = useTheme();
	const { coin } = route.params;

	console.log('\n\n\n');
	console.log(coin);
	return (
		<ScrollView style={{ flex: 1, backgroundColor: colors.detail4 }}>
			<SafeAreaView>
				<Header {...{ coin }} />
				<Chart />
				<ScrollView
					style={{
						width: '100%',
						height: '100%',
						borderTopLeftRadius: 24,
						borderTopRightRadius: 24,
						paddingHorizontal: 24,
						paddingTop: 32,
						backgroundColor: colors.background1
					}}
				>
					<Balance />
					<MarketCap />
				</ScrollView>
			</SafeAreaView>
		</ScrollView>
	);
};

export default AssetsScreen;
