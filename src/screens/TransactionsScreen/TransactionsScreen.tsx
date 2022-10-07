import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import RNUxcam from 'react-native-ux-cam';
import { BasicLayout } from '@layouts';
import { TransactionPeriod, EmptyStates, Header } from '@components';
import { useLanguage } from '@hooks';
import Selector from './Selector/Selector';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import { useTransactionsScreen } from './TransactionsScreen.hooks';

const TransactionsScreen = () => {
	RNUxcam.tagScreenName('TransactionsScreen');
	const { transactions, active, setActive } = useTransactionsScreen();
	const { i18n } = useLanguage();

	return (
		<BasicLayout bgc="background3" hideSafeAreaView>
			<HeaderContainer>
				<SafeAreaView />
				<Header title={i18n.t('TransactionsScreen.Header.transactions')} />
				<Selector {...{ active, setActive }} />
			</HeaderContainer>
			{transactions.length > 0 ? (
				<FlatList
					style={{ paddingHorizontal: 24 }}
					data={transactions}
					renderItem={({ item }) => <TransactionPeriod data={item.data} title={item.title} />}
					keyExtractor={(item) => item.title}
				/>
			) : (
				<EmptyStates.NoTransactions />
			)}
		</BasicLayout>
	);
};

export default TransactionsScreen;
