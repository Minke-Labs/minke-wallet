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

export const TitleContainer: React.FC<TitleContainerProps> = ({
	received,
	topUp,
	exchange,
	withdraw,
	value,
	token
}) => (
	<View mt="s" mh="xs" mb="xs">
		<View row cross="center">
			<Text type="hLarge" weight="bold">
				{received || topUp || exchange || withdraw ? '+' : '-'}
				{value}
			</Text>
			<View mh="xxs">
				<Token name={token.toLowerCase() as TokenType} size={32} glow />
			</View>
			<Text type="hLarge" weight="bold">
				{token}
			</Text>
		</View>
	</View>
);
