import React from 'react';
import { TokenType } from '@styles';
import { useNavigation } from '@hooks';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import TokenItem from '@src/components/TokenItem/TokenItem';
import Touchable from '@src/components/Touchable/Touchable';

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
				<View flex1>
					<Touchable
						onPress={onPress}
						opacity={onPress ? 0.6 : 1}
						row
					>
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
					</Touchable>
				</View>
				{!balance && !balanceUSD && (
					<View
						w={50}
						h="100%"
						main="center"
						cross="center"
					>
						<Touchable onPress={() => navigation.navigate('AddFundsScreen')}>
							<Text
								type="lLarge"
								weight="semiBold"
								color="cta1"
								{...(!paper && { mb: 'xs' })}
							>
								+ Buy
							</Text>
						</Touchable>
					</View>
				)}
			</View>
		</View>
	);
};

export default TokenItemCard;
