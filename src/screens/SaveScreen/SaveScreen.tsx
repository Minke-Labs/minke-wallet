import React, { useEffect } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { useTheme, useNavigation } from '@hooks';
import { aaveDeposits, AaveBalances } from '@models/deposit';
import { FlatList } from 'react-native-gesture-handler';
import { numberFormat } from '@src/helpers/utilities';
import { Text, Icon, Card } from '@components';
import { backgroundRoundedWaves as background } from '@images';
import AppLoading from 'expo-app-loading';
import EmptyState from './EmptyState/EmptyState';
import { makeStyles } from './SaveScreen.styles';
import TransactionIcon from '../WalletScreen/Transactions/TransactionIcon';

const SaveScreen = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	// const [aaveMarkets] = React.useState<Array<AaveMarket>>();
	const [aaveBalances, setAaveBalances] = React.useState<AaveBalances>();
	// const { address } = globalWalletState().value;
	// mainnet const address = '0xff32e57ceed15c2e07e03984bba66c220c06b13a';
	const address = '0x14bebdc546fdc6f01eb216effefa27f43c1c2a2f';

	useEffect(() => {
		// const getAaveMarkets = async () => {
		//  setAaveMarkets(await fetchAaveMarketData());
		// };
		// getAaveMarkets();

		const getAaveDeposits = async () => {
			setAaveBalances(await aaveDeposits(address));
		};

		getAaveDeposits();
	}, []);

	if (!aaveBalances) {
		return <AppLoading />;
	}

	const { products = [], meta } = aaveBalances[address.toLowerCase()];
	const lending = products.find((p) => p.label === 'Lending');
	if (!lending) {
		return <EmptyState />;
	}

	const { value: depositsBalance = 0 } = meta.find((m) => m.label === 'Assets') || {};

	return (
		<View style={styles.container}>
			<ImageBackground source={background} resizeMode="cover" style={styles.background}>
				<View style={styles.headerNavegation}>
					<TouchableOpacity style={styles.headerNavegationLeft} onPress={() => navigation.goBack()}>
						<Icon name="chevronLeft" color="cta1" size={24} />
						<Text weight="extraBold" color="text1" marginBottom={8}>
							Save
						</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Icon name="infoStroke" color="cta1" size={24} />
					</TouchableOpacity>
				</View>

				<View style={styles.saveCurrentValueContainer}>
					<Text color="text3" marginBottom={8}>
						Current deposits
					</Text>
					<Text type="a" weight="medium">
						{numberFormat(Number(depositsBalance))}
					</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 18 }}>
						<Icon name="upArrowSolid" color="alert3" size={14} />
						<Text weight="medium" type="a" color="alert3">
							10% interest p.a.
						</Text>
					</View>
					<TouchableOpacity
						style={[styles.row, styles.depositButton]}
						onPress={() => navigation.navigate('OpenAave')}
					>
						<Icon name="saveStroke" color="cta1" size={20} />
						<Text style={styles.depositButtonText}>Deposit</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>

			<View style={styles.depositCardContainer}>
				<View style={styles.actionDepositCard}>
					<FlatList
						keyExtractor={(item, idx) => `${item.address}${idx}`}
						data={lending.assets}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => {
							const deposit = item.groupId === 'supply';
							const { symbol } = item.tokens[0];
							return (
								<Card
									image={<TransactionIcon received={deposit} />}
									title={symbol}
									subtitle={deposit ? 'Deposit' : 'Borrow'}
									right={
										<View>
											<Text style={{ fontSize: 12, alignSelf: 'flex-end' }}>
												{item.balance.toFixed(2)} {symbol}
											</Text>
											<Text type="p2" weight="bold" style={{ alignSelf: 'flex-end' }}>
												{numberFormat(item.balanceUSD)}
											</Text>
										</View>
									}
								/>
							);
						}}
					/>
				</View>
			</View>
		</View>
	);
};

export default SaveScreen;
