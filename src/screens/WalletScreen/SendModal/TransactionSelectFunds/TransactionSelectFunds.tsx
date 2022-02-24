import React, { useEffect } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, Token } from '@components';
import { TokenType } from '@styles';
import { numberFormat, coinParamFromSymbol } from '@helpers/utilities';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useState } from '@hookstate/core';
import { WalletToken, getWalletTokens, imageSource } from '@src/model/wallet';
import { globalWalletState } from '@src/stores/WalletStore';
import { styles } from './TransactionSelectFunds.styles';

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
			{user.address ? <Image source={image!} style={styles.image} /> : null}
			<Text type="h3" weight="extraBold" marginBottom={32}>
				Which <Text color="text7" type="h3" weight="extraBold">asset</Text> do you want to send to{' '}
				<Text color="text7" type="h3" weight="extraBold">{user.name}</Text>?
			</Text>

			{walletTokens ? (
				<FlatList
					keyExtractor={(item) => item.symbol}
					data={walletTokens}
					renderItem={({ item }) =>
						(
							<TouchableOpacity
								onPress={() => onSelected(item)}
								style={{
									height: 40,
									flexDirection: 'row',
									marginBottom: 24
								}}
							>
								<Token
									name={item.symbol.toLowerCase() as TokenType}
									size={40}
								/>
								<View style={{ marginLeft: 16, justifyContent: 'space-between' }}>
									<Text weight="bold" type="p2">
										{coinParamFromSymbol({ symbol: item.symbol, type: 'name' })}
									</Text>
									<Text type="span" weight="bold">
										{numberFormat(item.balanceUSD)} ({item.balance.toFixed(3)} {item.symbol})
										<Text weight="regular" type="span"> available</Text>
									</Text>
								</View>
							</TouchableOpacity>
						)}
				/>
			) : (
				<ActivityIndicator color={colors.primary} />
			)}
		</View>
	);
};

export default TransactionSelectFunds;
