import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { BasicLayout } from '@layouts';
import Header from './Header/Header';
import Selector from './Selector/Selector';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import Body from './Body/Body';
import { useTransactionsScreen } from './TransactionsScreen.hooks';

const TransactionsScreen = () => {
	const { transactions, active, setActive, loadMoreTransactions, refreshing } = useTransactionsScreen();

	const renderFooter = () => {
		if (!refreshing) return null;

		return (
			<View
				style={{
					position: 'relative',
					paddingVertical: 20,
					marginTop: 10,
					marginBottom: 10
				}}
			>
				<ActivityIndicator animating size="large" />
			</View>
		);
	};

	return (
		<BasicLayout>
			<HeaderContainer>
				<Header />
				<Selector {...{ active, setActive }} />
			</HeaderContainer>

			<Body transactions={transactions} {...{ loadMoreTransactions, renderFooter }} />
		</BasicLayout>
	);
};

export default TransactionsScreen;
