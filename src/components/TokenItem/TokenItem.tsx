import React from 'react';
import { Text, View, Token } from '@components';
import { TokenType } from '@styles';

interface TokenItemProps {
	token: TokenType;
	name: string;
	symbol: string;
	subtitle: string;
	link?: boolean;
	rightValue: string;
}

const TokenItem: React.FC<TokenItemProps> = (
	{
		token,
		name,
		symbol,
		subtitle,
		link,
		rightValue
	}
) => (
	<View row main="space-between">
		<View row>
			<Token name={token} size={39} />
			<View mr={2} />
			<View>
				<View row cross="center">
					<Text type="lLarge" weight="semiBold">
						{name}
					</Text>
					<View mr={2} />
					<Text type="bSmall" color="text3">
						{symbol}
					</Text>
				</View>
				<Text type="lSmall" weight="semiBold">
					{subtitle}
				</Text>
			</View>
		</View>
		<View main="center">
			{link ? (
				<Text type="lLarge" weight="semiBold" color="cta1">
					{rightValue}
				</Text>
			) : (
				<Text type="lLarge" weight="semiBold">
					{rightValue}
				</Text>
			)}
		</View>
	</View>
);

export default TokenItem;
