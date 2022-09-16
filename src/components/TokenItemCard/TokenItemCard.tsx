import React from 'react';
import { useGlobalWalletState, useLanguage, useNavigation } from '@hooks';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import TokenItem from '@src/components/TokenItem/TokenItem';
import Touchable from '@src/components/Touchable/Touchable';
import { InvestmentToken, MinkeToken } from '@models/types/token.types';

interface TokenItemCardProps {
	token: InvestmentToken;
	onPress?: () => void;
	perc?: number;
	paper?: boolean;
}

const TokenItemCard: React.FC<TokenItemCardProps> = ({ token, paper, onPress }) => {
	const navigation = useNavigation();
	const { i18n } = useLanguage();
	const {
		network: { topUpTokens }
	} = useGlobalWalletState();
	const { balanceUSD } = token;
	const showBuyButton = (balanceUSD || 0) === 0;

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
						<TokenItem token={token} hideValues={showBuyButton} />
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
