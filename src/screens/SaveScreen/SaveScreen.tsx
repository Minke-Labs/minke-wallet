import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme, useNavigation } from '@hooks';
import { useState } from '@hookstate/core';
import { globalDepositState } from '@stores/DepositStore';
import { AaveMarket, fetchAaveMarketData } from '@models/deposit';
import { globalWalletState } from '@stores/WalletStore';
import { FlatList } from 'react-native-gesture-handler';
import { coinParamFromSymbol } from '@src/helpers/utilities';
import { TokenType } from '@src/styles';
import { Token, Text, Icon } from '@components';
import ValueBox from '../WalletAssets/ValueBox';
import { makeStyles } from './SaveScreen.styles';

const SaveScreen = () => {
	const navigation = useNavigation();
	const depositState = useState(globalDepositState());
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const [aaveMarkets, setAaveMarkets] = React.useState<Array<AaveMarket>>();
	const { balance: walletBallance } = globalWalletState().value;

	useEffect(() => {
		const getAaveMarkets = async () => {
			setAaveMarkets(await fetchAaveMarketData());
		};
		getAaveMarkets();
	}, []);

	const approveDeposit = (aaveMarket: AaveMarket) => {
		depositState.market.set(aaveMarket);
		navigation.navigate('OpenAave');
	};

	return (
		<View style={styles.container}>
			<ValueBox balance={walletBallance} title="Save" />
			<View style={styles.depositCardContainer}>
				<FlatList
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => `${item.address}`}
					data={aaveMarkets}
					renderItem={({ item }) => {
						const tokenSymbol = item.tokens[0].symbol;
						// const { balance = 0, balanceUSD = 0 } =
						// (walletTokens || []).find((t) => t.symbol === tokenSymbol) || {};
						return (
							<TouchableOpacity
								style={{
									height: 32,
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									paddingHorizontal: 24,
									marginVertical: 16
								}}
								onPress={() => approveDeposit(item)}
							>
								<View style={{ flexDirection: 'row' }}>
									<Token name={tokenSymbol.toLowerCase() as TokenType} size={32} />
									<View style={{ flexDirection: 'column' }}>
										<Text type="p" weight="bold" style={{ marginLeft: 8 }}>
											{coinParamFromSymbol({ symbol: tokenSymbol, type: 'name' })}
										</Text>
										<Text type="a" style={{ marginLeft: 8 }}>
											APY: {(item.supplyApy * 100).toFixed(5)}%
										</Text>
									</View>
								</View>
								<Icon name="arrowForwardStroke" color="text7" size={24} />
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		</View>
	);
};

export default SaveScreen;
