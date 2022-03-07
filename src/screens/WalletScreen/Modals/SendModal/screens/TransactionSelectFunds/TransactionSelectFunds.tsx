import React, { useEffect } from 'react';
import { View, FlatList, Image } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { Text } from '@components';
import { useState } from '@hookstate/core';
import { WalletToken, getWalletTokens, imageSource } from '@src/model/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { styles } from './TransactionSelectFunds.styles';
import { Card } from '../../components';
import { TransactionSelectFundsProps } from './TransactionSelectFunds.types';

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
			{user.address && <Image source={image!} style={styles.image} />}
			<Text type="h3" weight="extraBold" marginBottom={32}>
				Which{' '}
				<Text color="text12" type="h3" weight="extraBold">
					asset
				</Text>{' '}
				do you want to send to{' '}
				<Text color="text12" type="h3" weight="extraBold">
					{user.name}
				</Text>
				?
			</Text>

			{walletTokens ? (
				<FlatList
					style={styles.tokensList}
					keyExtractor={(item) => item.symbol}
					data={walletTokens}
					renderItem={({ item }) => <Card token={item} onSelected={() => onSelected(item)} />}
				/>
			) : (
				<ActivityIndicator color={colors.primary} />
			)}
		</View>
	);
};

export default TransactionSelectFunds;
