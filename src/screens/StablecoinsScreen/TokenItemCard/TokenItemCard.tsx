import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Paper2, TokenItem } from '@components';
import { TokenType } from '@styles';

interface TokenItemCardProps {
	token: TokenType;
	name: string;
	symbol: string;
	subtitle: string;
	rightValue: string;
	link?: boolean;
	onPress?: () => void;
}

export const TokenItemCard: React.FC<TokenItemCardProps> = ({
	token,
	name,
	symbol,
	subtitle,
	rightValue,
	link,
	onPress
}) => (
	<TouchableOpacity onPress={onPress} activeOpacity={0.6}>
		<Paper2 mb={3} br={3} p={3}>
			<TokenItem {...{ token, name, symbol, subtitle, rightValue, link }} />
		</Paper2>
	</TouchableOpacity>
);
