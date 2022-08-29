import React from 'react';
import { TokenType } from '@styles';
import { tokenBalanceFormat, numberFormat } from '@helpers/utilities';
import Text from '../Text/Text';
import Token from '../Token/Token';
import View from '../View/View';
import { Tag } from './Tag/Tag';

interface TokenItemProps {
	token: TokenType;
	name?: string;
	symbol: string;
	subtitle: string;
	balance?: string;
	balanceUSD?: number;
	perc?: number;
}

const TokenItem: React.FC<TokenItemProps> = ({
	token,
	name,
	symbol,
	subtitle,
	balance,
	balanceUSD,
	perc
}) => {
	const tokenName = name || symbol;
	return (
		<View row main="space-between" w="100%">
			<View row w={180}>
				<Token name={token} size={39} />
				<View mr="xxs" />
				<View>
					<View row cross="center">
						<Text type="lLarge" weight="semiBold">
							{tokenName.length < 10 ? tokenName : `${tokenName.substring(0, 7)}...`}
						</Text>
						<View mr="xxs" />
						<Text type="bSmall" color="text3">
							{name ? symbol : ''}
						</Text>
					</View>
					<Text type="lSmall" weight="semiBold">
						{subtitle}
					</Text>
				</View>
			</View>

			{!!perc && <Tag perc={perc} />}

			<View main="center">
				{!!balance && !!balanceUSD && (
					<View cross="flex-end">
						<>
							<Text type="lLarge" weight="semiBold">
								{tokenBalanceFormat(balance, 4)}
							</Text>
							<Text type="bDetail" color="text3">
								{numberFormat(balanceUSD)}
							</Text>
						</>
					</View>
				)}
				{!!balance && !balanceUSD && (
					<Text type="lLarge" weight="semiBold">
						{tokenBalanceFormat(balance, 4)}
					</Text>
				)}
				{!!balanceUSD && !balance && (
					<Text type="lLarge" weight="semiBold">
						{numberFormat(balanceUSD)}
					</Text>
				)}
			</View>
		</View>
	);
};

export default TokenItem;
