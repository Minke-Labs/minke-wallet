import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import Container from '@components/Container';
import styles from './styles';
import Header from './header/Header';
import AssetsPanel from './assets-panel/AssetsPanel';
import ActionsPanel from './actions-panel/ActionsPanel';
import FinancePanel from './finance-panel/FinancePanel';

export function WalletScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	return (
		<Container>
			<Header />
			<SafeAreaView>
				<ScrollView style={styles.homeScroll}>
					<AssetsPanel />
					<ActionsPanel navigation={navigation} />
					<FinancePanel />
				</ScrollView>
			</SafeAreaView>
		</Container>
	);
}
