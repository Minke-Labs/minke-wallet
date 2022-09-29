import React from 'react';
import { useNetwork } from '@hooks';
import { tokenBalanceFormat, numberFormat } from '@helpers/utilities';
import { InvestmentToken } from '@models/types/token.types';
import { TokenType } from '@styles';
import Text from '../Text/Text';
import Token from '../Token/Token';
import View from '../View/View';
import { Tag } from './Tag/Tag';

interface TokenItemProps {
	token: InvestmentToken;
	hideValues?: boolean;
}

const TokenItem: React.FC<TokenItemProps> = ({ token, hideValues }) => {
	const { network } = useNetwork();
	const { name, symbol, balance, balanceUSD, perc } = token;
	const tokenName = name || symbol;

	return (
		<View row cross="center" w="100%">
			<Token name={symbol.toLowerCase() as TokenType} size={39} />
			<View mr="xxs" />

			<View flex1>
				<View row cross="center" main="space-between">
					<View row>
						<Text type="lLarge" weight="semiBold">
							{tokenName.length < 20 ? tokenName : `${tokenName.substring(0, 17)}...`}
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
					<Text type="lSmall" weight="semiBold">
						{network.name || ''}
					</Text>

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
