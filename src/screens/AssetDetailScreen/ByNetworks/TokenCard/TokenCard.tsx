import React from 'react';
import { TokenItem, View } from '@components';
import { SpacingType, TokenType } from '@styles';

interface TokenCardProps {
	token: TokenType;
	name: string;
	symbol: string;
	subtitle: string;
	rightValue: string;
	mb?: SpacingType;
}

export const TokenCard: React.FC<TokenCardProps> = ({
	token,
	name,
	symbol,
	subtitle,
	rightValue,
	mb
}) => (
	<View mb={mb}>
		<TokenItem {...{ token, name, symbol, subtitle, rightValue }} />
	</View>
);
