import React from 'react';
import { TokenType } from '@styles';
import { tokenBalanceFormat, numberFormat } from '@helpers/utilities';
import Text from '../Text/Text';
import Token from '../Token/Token';
import View from '../View/View';
import { Tag } from './Tag/Tag';

interface TokenItemProps {
	token: TokenType;
	name: string;
	symbol: string;
	subtitle: string;
	rightValue?: string;
	rightBottomValueUSd?: number;
	rightValueUSD?: number;
	perc?: number;
}

const TokenItem: React.FC<TokenItemProps> = (
	{
		token,
		name,
		symbol,
		subtitle,
		rightValue,
		rightValueUSD,
		perc,
		rightBottomValueUSd
	}
) => (
	<View row main="space-between">
		<View row>
			<Token name={token} size={39} />
			<View mr="xxs" />
			<View>
				<View row cross="center">
					<Text type="lLarge" weight="semiBold">
						{name}
					</Text>
					<View mr="xxs" />
					<Text type="bSmall" color="text3">
						{symbol}
					</Text>
				</View>
				<Text type="lSmall" weight="semiBold">
					{subtitle}
				</Text>
			</View>
		</View>

		{!!perc && <Tag perc={perc} />}

		<View main="center">
			{(!rightValue && !rightValueUSD) ? (
				<Text type="lLarge" weight="semiBold" color="cta1">
					+ Buy
				</Text>
			) : (
				<View cross="flex-end">
					{!!rightValue && (
						<Text type="lLarge" weight="semiBold">
							{tokenBalanceFormat(rightValue, 4)}
						</Text>
					)}
					{!!rightBottomValueUSd && (
						<Text type="bDetail" color="text3">
							{numberFormat(rightBottomValueUSd)}
						</Text>
					)}
				</View>
			)}
			{!!rightValueUSD && (
				<Text type="lLarge" weight="semiBold">
					{numberFormat(rightValueUSD)}
				</Text>
			)}
		</View>
	</View>
);

export default TokenItem;
