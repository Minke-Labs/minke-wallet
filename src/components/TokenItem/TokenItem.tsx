import React from 'react';
import { TokenType } from '@styles';
import { truncate } from '@src/hooks/useTransaction';
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
	rightBottom?: string;
	perc?: number;
}

const TokenItem: React.FC<TokenItemProps> = (
	{
		token,
		name,
		symbol,
		subtitle,
		rightValue,
		perc,
		rightBottom
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
			{!rightValue ? (
				<Text type="lLarge" weight="semiBold" color="cta1">
					+ Buy
				</Text>
			) : (
				<View cross="flex-end">
					<Text type="lLarge" weight="semiBold">
						{truncate(rightValue, 4)}
					</Text>
					{rightBottom && (
						<Text type="bDetail" color="text3">
							{rightBottom}
						</Text>
					)}
				</View>
			)}
		</View>
	</View>
);

export default TokenItem;
