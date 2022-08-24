import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TokenType, SpacingType } from '@styles';
import { useNavigation } from '@hooks';
import Text from '../Text/Text';
import View from '../View/View';
import TokenItem from '../TokenItem/TokenItem';
import Paper from '../Paper/Paper';

interface TokenItemCardProps {
	token: TokenType;
	name?: string;
	symbol: string;
	subtitle: string;
	balance?: string;
	balanceUSD?: number;
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
	balance,
	balanceUSD,
	perc,
	paper,
	mb = 'm',
	onPress
}) => {
	const navigation = useNavigation();
	return (
		<View row main="flex-end" cross="center" mb="xs">
			<TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.6 : 1} style={{ flex: 1 }}>
				{paper ? (
					<Paper p="xs">
						<TokenItem
							{...{
								token,
								name,
								symbol,
								subtitle,
								balance,
								balanceUSD,
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
								balance,
								balanceUSD,
								perc
							}}
						/>
					</View>
				)}
			</TouchableOpacity>
			{!balance && !balanceUSD && (
				<TouchableOpacity
					onPress={() => navigation.navigate('AddFundsScreen')}
					style={{ position: 'absolute' }}
				>
					<View mr="xs">
						<Text
							type="lLarge"
							weight="semiBold"
							color="cta1"
							{...(!paper && { mb: 'xs' })}
						>
							+ Buy
						</Text>
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default TokenItemCard;
