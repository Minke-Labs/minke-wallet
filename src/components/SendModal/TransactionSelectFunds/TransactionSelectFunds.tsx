import React, { useEffect } from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import { getWalletTokens, WalletToken } from '@src/model/wallet';
import { styles } from './TransactionSelectFunds.styles';
import Card from './Card/Card';

interface UserProps {
	name: string;
	address: string;
}

interface TransactionSelectFundsProps {
	user: UserProps;
	onSelected: (name: string) => void;
}

const TransactionSelectFunds: React.FC<TransactionSelectFundsProps> = ({ user, onSelected }) => {
	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>();

	useEffect(() => {
		const fetchWalletTokens = async () => {
			// const address = wallet.value.wallet?.address || '';
			const address = '0xE69Eb4946188c5085f38e683b61b892a96c27124';
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map(({ assets }) => assets).flat();
			setWalletTokens(tokens);
		};

		fetchWalletTokens();
	}, []);

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={require('@assets/wallet-created.png')} />
			<Text style={styles.title}>
				Which <Text style={styles.titleHighlight}>asset</Text> do you want to send to{' '}
				<Text style={styles.titleHighlight}>{user.name}</Text>?
			</Text>

			<FlatList
				keyExtractor={(item) => item.symbol}
				data={walletTokens}
				renderItem={({ item }) => <Card token={item} {...{ user, onSelected }} />}
			/>
		</View>
	);
};

export default TransactionSelectFunds;
