import React from 'react';
import { TokenType } from '@styles';
import { useNetwork } from '@hooks';
import { tokenBalanceFormat, numberFormat } from '@helpers/utilities';
import Text from '../Text/Text';
import Token from '../Token/Token';
import View from '../View/View';
import { Tag } from './Tag/Tag';

interface TokenItemProps {
	token: TokenType;
	name?: string;
	symbol: string;
	balance?: string;
	balanceUSD?: number;
	perc?: number;
	hideValues?: boolean;
}

const TokenItem: React.FC<TokenItemProps> = ({ token, name, symbol, balance, balanceUSD, hideValues, perc }) => {
	const { network } = useNetwork();
	const tokenName = name || symbol;

	return (
		<View row cross="center" w="100%">

			<Token name={token} size={39} />
			<View mr="xxs" />

			<View flex1>

				<View row cross="center" main="space-between">
					<View row>
						<Text type="lLarge" weight="semiBold">
							{tokenName.length < 10 ? tokenName : `${tokenName.substring(0, 7)}...`}
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
						<View row cross="center">
							<Text type="bSmall" color="text3">
								{name ? symbol : ''}
							</Text>
							<View mr="xxs" />
							<Text type="bDetail" color="text3">
								{tokenBalanceFormat(balance || '0', 4)}
							</Text>
						</View>
					)}
				</View>

			</View>

		</View>
	);
};

export default TokenItem;
