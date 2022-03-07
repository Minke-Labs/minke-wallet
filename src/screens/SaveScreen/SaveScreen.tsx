import React, { useEffect } from 'react';
import { View, Image, useColorScheme, SafeAreaView } from 'react-native';
import { useTheme } from '@hooks';
import { aaveDeposits, AaveBalances, usdCoin, AaveMarket, fetchAaveMarketData } from '@models/deposit';
import { ScreenLoadingIndicator } from '@components';
import { useState } from '@hookstate/core';
import { globalDepositState } from '@src/stores/DepositStore';
import { walletAssetBackImg, walletAssetBackDarkImg } from '@images';
import { globalWalletState } from '@src/stores/WalletStore';
import EmptyState from './EmptyState/EmptyState';
import { makeStyles } from './SaveScreen.styles';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { CurrentValue } from './CurrentValue/CurrentValue';

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

const SaveScreen = () => {
	const { colors } = useTheme();
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
					<CurrentValue depositsBalance={depositsBalance} aaveMarket={aaveMarket!} />
				</Background>
			</SafeAreaView>

			<Body {...{ lending }} />
		</View>
	);
};
export default SaveScreen;
