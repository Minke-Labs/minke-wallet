import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TokenType, SpacingType } from '@styles';
import View from '../View/View';
import TokenItem from '../TokenItem/TokenItem';
import Paper2 from '../Paper2/Paper';

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
							rightBottomValueUSd,
							rightValueUSD,
							perc
						}}
					/>
				</Paper2>
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
			)
		}
	</TouchableOpacity>
);

export default TokenItemCard;
