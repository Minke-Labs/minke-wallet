import React, { useEffect, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getWalletTokens, WalletToken } from '@models/wallet';
import { WelcomeLayout } from '@layouts';
import { RootStackParamList } from '@src/routes/types.routes';
import { NativeTokens, nativeTokens, ParaswapToken, stablecoins } from '@models/token';
import { globalWalletState } from '@stores/WalletStore';
import { globalDepositState } from '@stores/DepositStore';
import { globalExchangeState } from '@stores/ExchangeStore';
import { aaveMarketTokenToParaswapToken } from '@models/deposit';
import { Icon, Modal, Text } from '@components';
import { Card } from 'react-native-paper';
import { useTheme } from '@hooks';
import { network } from '@models/network';
import TokenCard from '../ExchangeScreen/TokenCard';
import GasSelector from '../ExchangeScreen/GasSelector';
import { makeStyles } from './DepositScreen.styles';
import SearchTokens from '../ExchangeScreen/SearchTokens';

const DepositScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const { address } = globalWalletState().value;
	const { market } = globalDepositState().value;
	const { gas } = globalExchangeState().value;
	const [nativeToken, setNativeToken] = React.useState<ParaswapToken>();
	const [token, setToken] = React.useState<ParaswapToken>(aaveMarketTokenToParaswapToken(market));
	const [tokenBalance, setTokenBalance] = React.useState('0');
	const [searchVisible, setSearchVisible] = React.useState(false);
	const [walletTokens, setWalletTokens] = React.useState<Array<WalletToken>>([]);
	const [availableTokens, setAvailableTokens] = React.useState<Array<string>>([]);

	const hideModal = () => setSearchVisible(false);

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
				const { gweiValue } = gas || {};
				const gasPrice = gweiValue ? gweiValue * 41000 * 10 ** -9 : 0;
				return walletToken.balance - gasPrice;
			}
			return walletToken?.balance || 0;
		},
		[walletTokens, nativeToken, gas]
	);

	const onTokenSelected = (t: ParaswapToken) => {
		setToken(t);
		hideModal();
	};

	useEffect(() => {
		const getTokens = async () => {
			const result = await getWalletTokens(address);
			const { products } = result[address.toLowerCase()];
			const tokens = products.map((product) => product.assets.map((asset) => asset)).flat();
			setWalletTokens(tokens);
			const available = tokens.filter(({ symbol }) => stablecoins.includes(symbol));
			setAvailableTokens(available.map(({ symbol }) => symbol.toLowerCase()));
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
			const balance = balanceFrom(token);
			setTokenBalance(balance.toString());
		} else {
			setTokenBalance('0');
		}
	}, [walletTokens, token]);

	return (
		<>
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
						<TokenCard token={token} onPress={() => setSearchVisible(true)} balance={tokenBalance} />
					</Card>

					<GasSelector />
				</View>
			</WelcomeLayout>
			<Modal isVisible={searchVisible} onDismiss={hideModal}>
				<SearchTokens
					visible={searchVisible}
					onDismiss={hideModal}
					onTokenSelect={onTokenSelected}
					ownedTokens={availableTokens}
					showOnlyOwnedTokens
					selected={[token.symbol.toLowerCase()]}
				/>
			</Modal>
		</>
	);
};

export default DepositScreen;
