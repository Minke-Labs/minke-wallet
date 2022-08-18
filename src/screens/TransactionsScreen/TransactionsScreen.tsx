import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { BasicLayout } from '@layouts';
import { TransactionPeriod } from '@components';
import RNUxcam from 'react-native-ux-cam';
import Header from './Header/Header';
import Selector from './Selector/Selector';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import { useTransactionsScreen } from './TransactionsScreen.hooks';

const TransactionsScreen = () => {
	RNUxcam.tagScreenName('TransactionsScreen');
	const { transactions, active, setActive } = useTransactionsScreen();

	return (
		<BasicLayout bgc="background3" hideSafeAreaView>
			<HeaderContainer>
				<SafeAreaView />
				<Header />
				<Selector {...{ active, setActive }} />
			</HeaderContainer>
			<FlatList
				style={{ paddingHorizontal: 24 }}
				data={transactions}
				renderItem={({ item }) => (
					<TransactionPeriod
						data={item.data}
						title={item.title}
					/>
				)}
				keyExtractor={(item) => item.title}
			/>
		</BasicLayout>
	);
};

export default TransactionsScreen;
