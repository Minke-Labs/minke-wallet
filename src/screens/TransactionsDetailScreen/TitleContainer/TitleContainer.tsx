import React from 'react';
import { Text, Token, View } from '@components';
import { TokenType } from '@styles';

interface TitleContainerProps {
	received: boolean;
	topUp: boolean;
	exchange: boolean;
	withdraw: boolean;
	value: number;
	token: string;
}

const truncVal = (val: number) => Math.trunc(val);
const valLen = (val: number) => String(truncVal(val)).length;

export const TitleContainer: React.FC<TitleContainerProps> = ({
	received,
	topUp,
	exchange,
	withdraw,
	value,
	token
}) => (
	<View mt="s" mh="xs" mb="xs" row={valLen(value) <= 5} cross={valLen(value) <= 5 ? 'center' : 'flex-start'}>
		<View row cross="center">
			<Text type="hLarge" weight="bold">
				{received || topUp || exchange || withdraw ? '+' : '-'}
				{value}
			</Text>
			<View mh="xxs">
				<Token name={token.toLowerCase() as TokenType} size={32} glow />
			</View>
		</View>
		<Text type="hLarge" weight="bold">
			{token}
		</Text>
	</View>
);
