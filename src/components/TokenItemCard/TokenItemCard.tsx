import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, TokenItem, Paper2 } from '@components';
import { TokenType } from '@styles';

interface TokenItemCardProps {
	token: TokenType;
	name: string;
	symbol: string;
	subtitle: string;
	rightValue?: string;
	rightBottom?: string;
	onPress?: () => void;
	perc?: number;
	paper?: boolean;
}

const TokenItemCard: React.FC<TokenItemCardProps> = ({
	token,
	name,
	symbol,
	subtitle,
	rightValue,
	rightBottom,
	perc,
	paper,
	onPress
}) => (
	<TouchableOpacity onPress={onPress} activeOpacity={0.6}>
		{
			paper ? (
				<Paper2 mb="xs" br="xs" p="xs">
					<TokenItem
						{...{
							token,
							name,
							symbol,
							subtitle,
							rightValue,
							rightBottom,
							perc
						}}
					/>
				</Paper2>
			) : (
				<View mb="m">
					<TokenItem
						{...{
							token,
							name,
							symbol,
							subtitle,
							rightValue,
							rightBottom,
							perc
						}}
					/>
				</View>
			)
		}
	</TouchableOpacity>
);

export default TokenItemCard;
