import React from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from '@hookstate/core';
import { globalWalletState } from '@stores/WalletStore';
import { getTransactions } from '@models/wallet';
import { WelcomeLayout } from '@layouts';
import { Icon, Text } from '@components';
import { useNavigation } from '@src/hooks';
import Transaction from '../WalletScreen/Transactions/Transaction';
import styles from './TransactionsScreen.styles';

const TransactionsScreen = () => {
	const wallet = useState(globalWalletState());
	const [page, setPage] = React.useState(1);
	const [refreshing, setRefreshing] = React.useState(false);
	const [loadedAll, setLoadedAll] = React.useState(false);
	const navigation = useNavigation();
	const { transactions = [] } = wallet.value;

	const loadMoreTransactions = async () => {
		if (!loadedAll) {
			setRefreshing(true);
			setPage(page + 1);
			const result = await getTransactions(wallet.value.address || '', page + 1, 20);
			if (result.length > 0) {
				wallet.transactions.merge(result);
			} else {
				setLoadedAll(true);
			}
		}

		setRefreshing(false);
	};

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
		<WelcomeLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>
			<View style={styles.container}>
				<Text weight="extraBold" type="h3">
					Accounts
				</Text>
				<SafeAreaView>
					<FlatList
						style={{ marginTop: 24, marginBottom: 24 }}
						data={transactions}
						renderItem={({ item }) => <Transaction transaction={item} />}
						keyExtractor={(transaction, index) => `${transaction.hash}${transaction.value}${index}`}
						onEndReached={loadMoreTransactions}
						onEndReachedThreshold={0.5}
						ListFooterComponent={renderFooter}
					/>
				</SafeAreaView>
			</View>
		</WelcomeLayout>
	);
};

export default TransactionsScreen;
