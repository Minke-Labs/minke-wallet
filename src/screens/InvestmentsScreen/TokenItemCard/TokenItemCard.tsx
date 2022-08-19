import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, TokenItem } from '@components';
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
		<View mb="m">
			<TokenItem
				{...{
					token,
					name,
					symbol,
					subtitle,
					rightValue,
					link
				}}
			/>
		</View>
	</TouchableOpacity>
);
