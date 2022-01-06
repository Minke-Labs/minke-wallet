import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import Container from '../../components/Container';
import Header from './header/Header';
import AssetsPanel from './assets-panel/AssetsPanel';
import ActionsPanel from './actions-panel/ActionsPanel';
import FinancePanel from './finance-panel/FinancePanel';

export function WalletScreen() {
	return (
		<Container>
			<Header />
			<SafeAreaView>
				<ScrollView style={styles.homeScroll}>
					<AssetsPanel />
					<ActionsPanel />
					<FinancePanel />
				</ScrollView>
			</SafeAreaView>
		</Container>
	);
}
