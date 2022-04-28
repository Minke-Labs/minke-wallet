import React from 'react';
import { View } from 'react-native';
import { TokenType } from '@styles';
import { Text, Token, ActivityIndicator } from '@components';
import { tokenBalanceFormat } from '@helpers/utilities';
import { TokenDetailProps } from './TokenDetail.types';

export const TokenDetail: React.FC<TokenDetailProps> = ({
	token, amount, usdAmount
}) => (
	<View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', padding: 16 }}>
		<View style={{ borderRadius: 50, borderWidth: 2, borderColor: 'rgba(98, 126, 234, 0.2)', marginRight: 8 }}>
			<Token size={34} name={token.symbol.toLowerCase() as TokenType} glow />
		</View>
		<View>
			{usdAmount ? (
				<Text type="p2" weight="extraBold" color="text2">
					${tokenBalanceFormat(usdAmount, 4)}
				</Text>
			) : (
				<ActivityIndicator />
			)}
			<Text type="a" weight="medium" color="text2">
				{amount} {token.symbol}
			</Text>
		</View>
	</View>
);
