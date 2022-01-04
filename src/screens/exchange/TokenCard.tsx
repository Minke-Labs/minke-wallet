import React from 'react';
import { Image, Text } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { ParaswapToken } from '../../model/token';

const TokenCard = ({ token, onPress }: { token: ParaswapToken | undefined; onPress: (() => void) | undefined }) => (
	<Card onPress={onPress} style={{ width: '40%' }}>
		<Card.Content>
			{token ? (
				<>
					<Image source={{ uri: token.img }} style={{ width: 50, height: 50 }} />
					<Text>{token.symbol}</Text>
					<IconButton icon="chevron-right" color="#D0D0D0" />
				</>
			) : (
				<Text>Choose token</Text>
			)}
		</Card.Content>
	</Card>
);

export default TokenCard;
