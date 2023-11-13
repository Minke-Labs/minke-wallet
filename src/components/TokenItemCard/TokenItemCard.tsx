import React from 'react';

import { useGlobalWalletState, useLanguage, useNavigation, useWalletEnabled } from '@hooks';
import { InvestmentToken, MinkeToken } from '@models/types/token.types';
import Text from '@src/components/Text/Text';
import TokenItem from '@src/components/TokenItem/TokenItem';
import Touchable from '@src/components/Touchable/Touchable';
import View from '@src/components/View/View';

interface TokenItemCardProps {
	token: InvestmentToken;
	onPress?: () => void;
	perc?: number;
	paper?: boolean;
	showNetworkIcon?: boolean;
	chainIds?: number[];
}

const TokenItemCard: React.FC<TokenItemCardProps> = ({
	token,
	paper,
	onPress,
	chainIds = [],
	showNetworkIcon = true
}) => {
	const navigation = useNavigation();
	const { i18n } = useLanguage();
	const {
		network: { topUpTokens }
	} = useGlobalWalletState();
	const { balanceUSD, balance } = token;
	const { walletEnabled } = useWalletEnabled();
	const showBuyButton = walletEnabled && (balanceUSD || 0) === 0 && (balance || '0') === '0';

	const handleBuy = (coin: MinkeToken) => {
		if (topUpTokens.map((t) => t.symbol).includes(coin.symbol)) {
			navigation.navigate('AddFundsScreen', { topupToken: coin });
		} else {
			navigation.navigate('ExchangeScreen', { destToken: coin });
		}
	};

	return (
		<View mb={paper ? 'xs' : 'm'} main="space-between">
			<View {...(paper && { bgc: 'background5', br: 'xs' })} flex1 row main="space-between">
				<View flex1>
					<Touchable onPress={onPress} opacity={onPress ? 0.6 : 1} row {...(paper && { p: 'xs' })}>
						<TokenItem
							token={token}
							hideValues={showBuyButton}
							showNetworkIcon={showNetworkIcon}
							chainIds={chainIds}
						/>
					</Touchable>
				</View>
				{showBuyButton && (
					<View h="100%" main="center" cross="flex-end" pr="xs">
						<Touchable onPress={() => handleBuy(token)}>
							<Text type="lLarge" weight="semiBold" color="cta1">
								+ {i18n.t('Components.TokenItemCard.buy')}
							</Text>
						</Touchable>
					</View>
				)}
			</View>
		</View>
	);
};

export default TokenItemCard;
