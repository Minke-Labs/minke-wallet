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

	const truncVal = (val: string) => {
		const before = val.split('.')[0];
		const after = val.split('.')[1];
		if (after && after.length > 8) {
			return `${before}.${after.substring(0, 8)}...`;
		}
		return val;
	};

	return (
		<>
			<Token
				size={48}
				name={token.symbol.toLowerCase() as TokenType}
			/>

			{usdAmount ? (
				<Text
					style={{ marginTop: 16 }}
					mb="xxxs"
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
				color="text3"
				center
				width={132}
			>
				{truncVal(amount)} {token.symbol}
			</Text>
		</>
	);
};
