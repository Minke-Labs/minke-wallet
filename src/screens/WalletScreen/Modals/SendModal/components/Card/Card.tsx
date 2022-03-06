/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TokenType } from '@styles';
import { Text, Token } from '@components';
import { numberFormat, coinParamFromSymbol } from '@helpers/utilities';
import { CardProps } from './Card.types';
import styles from './Card.styles';

const Card: React.FC<CardProps> = ({ token, onSelected }) => (
	<TouchableOpacity
		{...(onSelected && { onPress: () => onSelected(token) })}
		{...(!onSelected && { activeOpacity: 1 })}
		style={styles.container}
	>
		<Token name={token.symbol.toLowerCase() as TokenType} size={40} />
		<View style={styles.titleContainer}>
			<Text weight="bold" type="p2">
				{coinParamFromSymbol({ symbol: token.symbol, type: 'name' })}
			</Text>
			<Text type="span" weight="bold">
				{numberFormat(token.balanceUSD)} ({token.balance.toString().match(/^-?\d+(?:\.\d{0,9})?/)}{' '}
				{token.symbol})
				<Text weight="regular" type="span">
					{' '}
					available
				</Text>
			</Text>
		</View>
	</TouchableOpacity>
);

export default Card;
