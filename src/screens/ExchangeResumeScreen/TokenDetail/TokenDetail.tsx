import React from 'react';
import { TokenType } from '@styles';
import { Text, Token, ActivityIndicator } from '@components';
import { tokenBalanceFormat } from '@helpers/utilities';
import { View } from 'react-native';
import { TokenDetailProps } from './TokenDetail.types';

export const TokenDetail: React.FC<TokenDetailProps> = ({ token, amount, usdAmount, loading }) => {
	if (loading) {
		return (
			<>
				<ActivityIndicator size={24} />
				<View style={{ marginBottom: 12 }} />
			</>
		);
	}
	return (
		<>
			<Token
				size={48}
				name={token.symbol.toLowerCase() as TokenType}
			/>

			{usdAmount ? (
				<Text
					style={{ marginTop: 16 }}
					marginBottom={4}
					weight="semiBold"
					type="lMedium"
				>
					${tokenBalanceFormat(usdAmount, 4)}
				</Text>
			) : (
				<ActivityIndicator />
			)}

			<Text
				type="lMedium"
				weight="medium"
				color="text2"
				center
				width={132}
			>
				{amount} {token.symbol}
			</Text>
		</>
	);
};
