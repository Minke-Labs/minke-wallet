import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TokenType } from '@styles';
import { useNavigation } from '@hooks';
import Text from '../Text/Text';
import View from '../View/View';
import TokenItem from '../TokenItem/TokenItem';

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
	onPress
}) => {
	const navigation = useNavigation();

	return (
		<View mb={paper ? 'xs' : 'm'} main="space-between">
			<View
				{...(paper && { bgc: 'background5', br: 'xs', p: 'xs' })}
				flex1
				row
				main="space-between"
			>
				<TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.6 : 1} style={{ flex: 1 }}>
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
				</TouchableOpacity>
				{!balance && !balanceUSD && (
					<TouchableOpacity
						onPress={() => navigation.navigate('AddFundsScreen')}
						style={{ alignSelf: 'center' }}
					>
						<Text
							type="lLarge"
							weight="semiBold"
							color="cta1"
							{...(!paper && { mb: 'xs' })}
							style={{ alignSelf: 'center' }}
						>
							+ Buy
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default TokenItemCard;
