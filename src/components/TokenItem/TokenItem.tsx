import React from 'react';
import { tokenBalanceFormat, numberFormat } from '@helpers/utilities';
import { InvestmentToken, MinkeToken } from '@models/types/token.types';
import { Network, networks } from '@models/network';
import Text from '../Text/Text';
import Token from '../Token/Token';
import View from '../View/View';
import { Tag } from './Tag/Tag';

interface TokenItemProps {
	token: InvestmentToken;
	chainIds?: number[];
	hideValues?: boolean;
	showNetworkIcon?: boolean;
}

const TokenItem: React.FC<TokenItemProps> = ({ token, hideValues, chainIds = [], showNetworkIcon = true }) => {
	const { name, symbol, balance, balanceUSD, perc } = token;
	const tokenName = name || symbol;
	const foundNetworks: Network[] = Object.values(networks).filter((network) => chainIds.includes(network.chainId));

	return (
		<View row cross="center" w="100%">
			<Token token={token} size={39} showNetworkIcon={showNetworkIcon} />
			<View mr="xxs" />

			<View flex1>
				<View row cross="center" main="space-between">
					<View row>
						<Text type="lLarge" weight="semiBold">
							{tokenName.length < 18 ? tokenName : `${tokenName.substring(0, 15)}...`}
						</Text>
						<View mr="xxs" />
						{!!perc && <Tag perc={perc} />}
					</View>

					{!hideValues && (
						<Text type="lLarge" weight="semiBold">
							{numberFormat(balanceUSD || 0)}
						</Text>
					)}
				</View>

				<View row main="space-between">
					<View row main="space-between">
						<View mr="xxxs">
							<Text type="lSmall" weight="semiBold">
								{token.symbol}
							</Text>
						</View>
						{foundNetworks.map(({ nativeToken }) => (
							<View mr="xxxs">
								<Token token={nativeToken as MinkeToken} size={16} />
							</View>
						))}
					</View>

					{!hideValues && (
						<Text type="bDetail" color="text3">
							{tokenBalanceFormat(balance || '0')}
						</Text>
					)}
				</View>
			</View>
		</View>
	);
};

export default TokenItem;
