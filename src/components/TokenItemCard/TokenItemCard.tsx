import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TokenType, SpacingType } from '@styles';
import View from '../View/View';
import TokenItem from '../TokenItem/TokenItem';
import Paper from '../Paper/Paper';

interface TokenItemCardProps {
	token: TokenType;
	name: string;
	symbol: string;
	subtitle: string;
	rightValue?: string;
	rightBottomValueUSd?: number;
	rightValueUSD?: number;
	onPress?: () => void;
	perc?: number;
	paper?: boolean;
	mb?: SpacingType;
}

const TokenItemCard: React.FC<TokenItemCardProps> = ({
	token,
	name,
	symbol,
	subtitle,
	rightValue,
	rightBottomValueUSd,
	rightValueUSD,
	perc,
	paper,
	mb = 'm',
	onPress
}) => (
	<TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.6 : 1}>
		{paper ? (
			<Paper mb="xs" p="xs">
				<TokenItem
					{...{
						token,
						name,
						symbol,
						subtitle,
						rightValue,
						rightBottomValueUSd,
						rightValueUSD,
						perc
					}}
				/>
			</Paper>
		) : (
			<View mb={mb}>
				<TokenItem
					{...{
						token,
						name,
						symbol,
						subtitle,
						rightValue,
						rightBottomValueUSd,
						rightValueUSD,
						perc
					}}
				/>
			</View>
		)}
	</TouchableOpacity>
);

export default TokenItemCard;
