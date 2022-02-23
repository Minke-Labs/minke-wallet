/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useState } from '@hookstate/core';
import { WalletToken, getWalletTokens, imageSource } from '@src/model/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { styles } from './TransactionSelectFunds.styles';
import Item from '../TransactionContacts/Item';

interface UserProps {
	name: string;
	address: string;
}

interface TransactionSelectFundsProps {
	user: UserProps;
	onSelected: (token: WalletToken) => void;
}

const TransactionSelectFunds: React.FC<TransactionSelectFundsProps> = ({ user, onSelected }) => {
	const [image, setImage] = React.useState<{ uri: string }>();
	const wallet = useState(globalWalletState());
	const { colors } = useTheme();
	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>();

	useEffect(() => {
		const fetchWalletTokens = async () => {
			const address = wallet.address.value || '';
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map(({ assets }) => assets).flat();
			setWalletTokens(tokens);
		};

		const fetchImage = async () => {
			setImage(await imageSource(user.address));
		};

		fetchWalletTokens();
		fetchImage();
	}, []);

	return (
		<View style={styles.container}>
			{/* {user.address ? <Image source={image} style={styles.image} /> : null} */}
			<Text style={styles.title}>
				Which <Text style={styles.titleHighlight}>asset</Text> do you want to send to{' '}
				<Text style={styles.titleHighlight}>{user.name}</Text>?
			</Text>

			{walletTokens ? (
				<FlatList
					keyExtractor={(item) => item.symbol}
					data={walletTokens}
					renderItem={({ item }) => (
						<Item
							firstLine={item.symbol}
							secondLine={
								// eslint-disable-next-line react/jsx-wrap-multilines
								<Text style={styles.subtitle}>
									${item.balanceUSD.toString().match(/^-?\d+(?:\.\d{0,2})?/)} ({item.balance}{' '}
									{item.symbol})<Text style={styles.available}> available</Text>
								</Text>
							}
							imageSource={require('@assets/eth.png')}
							onSelected={() => onSelected(item)}
						/>
					)}
				/>
			) : (
				<ActivityIndicator color={colors.primary} />
			)}
		</View>
	);
};

export default TransactionSelectFunds;
