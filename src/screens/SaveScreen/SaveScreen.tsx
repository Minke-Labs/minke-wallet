/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { ImageBackground, TouchableOpacity, View, Image, useColorScheme, SafeAreaView } from 'react-native';
import { useTheme, useNavigation } from '@hooks';
import { aaveDeposits, AaveBalances, usdCoin, AaveMarket, fetchAaveMarketData } from '@models/deposit';
import { FlatList } from 'react-native-gesture-handler';
import { numberFormat } from '@src/helpers/utilities';
import { Text, Icon, Card, Button, ScreenLoadingIndicator } from '@components';
import { useState } from '@hookstate/core';
import { globalDepositState } from '@src/stores/DepositStore';
import { backgroundRoundedWaves as background, walletAssetBackImg, walletAssetBackDarkImg } from '@images';
import { BlurView } from 'expo-blur';
import { globalWalletState } from '@src/stores/WalletStore';
import EmptyState from './EmptyState/EmptyState';
import { makeStyles } from './SaveScreen.styles';
import TransactionIcon from '../WalletScreen/components/Transactions/TransactionIcon';

const Background: React.FC = ({ children }) => {
	const scheme = useColorScheme();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={{ paddingHorizontal: 24, height: 328 }}>
			<Image
				resizeMode="cover"
				source={scheme === 'dark' ? walletAssetBackDarkImg : walletAssetBackImg}
				style={styles.background}
			/>
			{children}
		</View>
	);
};

const Header = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.headerNavigation}>
			<TouchableOpacity style={styles.headerNavigationLeft} onPress={() => navigation.goBack()}>
				<Icon name="arrowBackStroke" color="text7" size={24} />
				<Text weight="extraBold" style={{ marginLeft: 12 }}>
					Save
				</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Icon name="infoStroke" color="text7" size={24} />
			</TouchableOpacity>
		</View>
	);
};

const SaveScreen = () => {
	const navigation = useNavigation();
	const { colors } = useTheme();
	const scheme = useColorScheme();
	const styles = makeStyles(colors);
	const [aaveMarket, setAaveMarket] = React.useState<AaveMarket>();
	const [selectedUSDCoin, setSelectedUSDCoin] = React.useState('');
	const [aaveBalances, setAaveBalances] = React.useState<AaveBalances>();
	const depositState = useState(globalDepositState());
	const { address } = globalWalletState().value;
	// mainnet const address = '0xff32e57ceed15c2e07e03984bba66c220c06b13a';
	// const address = '0x14bebdc546fdc6f01eb216effefa27f43c1c2a2f';

	const getAaveMarket = async () => {
		const markets = await fetchAaveMarketData();
		const defaultMarket = markets.find((m) => m.tokens[0].symbol === selectedUSDCoin);
		if (defaultMarket) {
			setAaveMarket(defaultMarket);
			depositState.market.set(defaultMarket);
		}
	};

	useEffect(() => {
		const getDefaultUSDCoin = async () => {
			setSelectedUSDCoin(await usdCoin());
		};

		const getAaveDeposits = async () => {
			setAaveBalances(await aaveDeposits(address));
		};

		getDefaultUSDCoin();
		getAaveDeposits();
	}, []);

	useEffect(() => {
		if (selectedUSDCoin) {
			getAaveMarket();
		}
	}, [selectedUSDCoin]);

	if (!aaveBalances) {
		return <ScreenLoadingIndicator />;
	}

	const { products = [], meta } = aaveBalances[address.toLowerCase()];
	const lending = products.find((p) => p.label === 'Lending');
	if (!lending) {
		return <EmptyState />;
	}
	const { value: depositsBalance = 0 } = meta.find((m) => m.label === 'Assets') || {};

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<Background>
					<Header />
					<View style={styles.saveCurrentValueContainer}>
						<BlurView
							intensity={12}
							tint={scheme === 'dark' ? 'dark' : 'light'}
							style={styles.saveCurrentValue}
						>
							<Text type="p2" color="text3" marginBottom={8}>
								Current deposits
							</Text>
							<Text type="textLarge" weight="medium" marginBottom={14}>
								{numberFormat(Number(depositsBalance))}
							</Text>
							{aaveMarket && (
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										paddingVertical: 4,
										paddingHorizontal: 12,
										backgroundColor: colors.alert4,
										borderRadius: 8,
										marginBottom: 16
									}}
								>
									<Icon name="iconUp" color="alert3" size={14} style={{ marginRight: 8 }} />
									<Text weight="medium" type="a" color="alert3">
										{(aaveMarket.supplyApy * 100).toFixed(2)}% interest p.a.
									</Text>
								</View>
							)}
						</BlurView>
						<TouchableOpacity style={styles.depositButton} onPress={() => navigation.navigate('Deposit')}>
							<Icon name="saveStroke" color="cta1" size={20} />
							<Text marginBottom={4} style={{ marginLeft: 8 }}>
								Deposit
							</Text>
						</TouchableOpacity>
					</View>
				</Background>
			</SafeAreaView>

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
				<Button title="Deposit" onPress={() => navigation.navigate('Deposit')} />
			</View>
		</View>
	);
};

export default SaveScreen;
