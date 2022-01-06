import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import styles from './styles';
import Header from './header/Header';
import AssetsPanel from './assets-panel/AssetsPanel';
import ActionsPanel from './actions-panel/ActionsPanel';
import FinancePanel from './finance-panel/FinancePanel';

export function WalletScreen() {
	return (
		<View style={styles.container}>
			<Header />
			<SafeAreaView>
				<ScrollView style={styles.homeScroll}>
					<AssetsPanel />
					<ActionsPanel />
					<FinancePanel />
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
