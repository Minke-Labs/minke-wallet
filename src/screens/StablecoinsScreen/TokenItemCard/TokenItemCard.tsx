import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Paper2, TokenItem } from '@components';
import { TokenType } from '@styles';

interface TokenItemCardProps {
	token: TokenType;
	name: string;
	symbol: string;
	subtitle: string;
	rightValue?: string;
	rightBottom?: string;
	onPress?: () => void;
}

export const TokenItemCard: React.FC<TokenItemCardProps> = ({
	token,
	name,
	symbol,
	subtitle,
	rightValue,
	rightBottom,
	onPress
}) => (
	<TouchableOpacity onPress={onPress} activeOpacity={0.6}>
		<Paper2 mb="xs" br="xs" p="xs">
			<TokenItem {...{ token, name, symbol, subtitle, rightValue, rightBottom }} />
		</Paper2>
	</TouchableOpacity>
);
