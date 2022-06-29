import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { BasicLayout } from '@layouts';
import { TransactionPeriod } from '@components';
import { useTheme } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import Header from './Header/Header';
import Selector from './Selector/Selector';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import { useTransactionsScreen } from './TransactionsScreen.hooks';
import { makeStyles } from './TransactionsScreen.styles';

const TransactionsScreen = () => {
	RNUxcam.tagScreenName('TransactionsScreen');
	const { transactions, active, setActive } = useTransactionsScreen();
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
		<BasicLayout>
			<HeaderContainer>
				<Header />
				<Selector {...{ active, setActive }} />
			</HeaderContainer>
			<ScrollView>
				<SafeAreaView style={styles.container}>
					{transactions.map(({ data, title }) => (
						<TransactionPeriod data={data} title={title} key={title} />
					))}
				</SafeAreaView>
			</ScrollView>
		</BasicLayout>
	);
};

export default TransactionsScreen;
