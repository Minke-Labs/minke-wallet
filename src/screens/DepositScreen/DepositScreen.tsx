import React, { useEffect, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getWalletTokens, WalletToken } from '@models/wallet';
import { WelcomeLayout } from '@layouts';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeTokens, nativeTokens, ParaswapToken } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { aaveMarketTokenToParaswapToken } from '@models/deposit';
import { Icon, Text } from '@components';
import { Card } from 'react-native-paper';
import { useTheme } from '@hooks';
import { makeStyles } from './DepositScreen.styles';
import TokenCard from '../ExchangeScreen/TokenCard';
import { network } from '@src/model/network';
import GasSelector from '../ExchangeScreen/GasSelector';

const DepositScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { market } = globalDepositState().value;
	const { address } = globalWalletState().value;
	const [nativeToken, setNativeToken] = React.useState<ParaswapToken>();
	const [token] = React.useState<ParaswapToken>(aaveMarketTokenToParaswapToken(market));
	const [tokenBalance, setTokenBalance] = React.useState('0');

	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>([]);

	const balanceFrom = useCallback(
		(paraSwapToken: ParaswapToken | undefined): number => {
			if (!paraSwapToken) {
				return 0;
			}
			const walletToken = walletTokens?.find(
				(owned) => owned.symbol.toLowerCase() === paraSwapToken.symbol.toLowerCase()
			);
			const isNativeToken = nativeToken && nativeToken.symbol === walletToken?.symbol;
			if (isNativeToken && walletToken) {
				const { gweiValue } = {};
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return walletToken.balance - gasPrice;
			}
			return walletToken?.balance || 0;
		},
		[walletTokens, nativeToken] // @TODO: Marcos update gas here too
	);

	useEffect(() => {
		const getTokens = async () => {
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map((product) => product.assets.map((asset) => asset)).flat();
			setWalletTokens(tokens);
		};

		const loadNativeToken = async () => {
			const {
				nativeToken: { symbol: nativeTokenSymbol }
			} = await network();
			const native = nativeTokens[nativeTokenSymbol as keyof NativeTokens];
			setNativeToken(native);
		};

		loadNativeToken();
		getTokens();
	}, []);

	useEffect(() => {
		if (token && walletTokens.length > 0) {
			setTokenBalance(balanceFrom(token).toString());
		} else {
			setTokenBalance('0');
		}
	}, [walletTokens, token]);

	return (
		<WelcomeLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
			</View>
			<View style={styles.deposit}>
				{token && tokenBalance && (
					<View style={styles.depositHeadline}>
						<Text type="h3" weight="extraBold">
							Deposit
						</Text>
						<Text type="a" weight="regular" color="text3">
							Balance:{' '}
							<Text type="a" weight="extraBold" color="text3">
								{tokenBalance} {token.symbol}
							</Text>
						</Text>
					</View>
				)}

				<Card style={styles.tokenCard}>
					<TokenCard
						token={token}
						onPress={() => console.log('Pressed')}
						balance={tokenBalance}
						updateQuotes={() => console.log('update tokens')}
					/>
				</Card>

				<GasSelector />
			</View>
		</WelcomeLayout>
	);
};

export default DepositScreen;
