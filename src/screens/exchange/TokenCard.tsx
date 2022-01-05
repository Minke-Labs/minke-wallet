/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect, RefObject } from 'react';
import { Image, Text, TextInput } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { ParaswapToken } from '../../model/token';

const TokenCard = ({
	token,
	onPress,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	balance,
	innerRef
}: {
	token: ParaswapToken | undefined;
	onPress: (() => void) | undefined;
	// eslint-disable-next-line react/require-default-props
	balance?: number;
	// eslint-disable-next-line react/require-default-props
	innerRef: RefObject<TextInput>;
}) => {
	const [amount, setAmount] = useState('');
	const onChangeText = (value: string) => {
		let lastValid = amount;
		// eslint-disable-next-line no-useless-escape
		const validNumber = new RegExp(/^\d*\,?\d*$/); // for comma
		if (validNumber.test(value)) {
			lastValid = value;
		} else {
			lastValid = amount;
		}
		setAmount(lastValid);
	};

	useEffect(() => {
		setAmount('');
	}, [token]);

	return (
		<Card onPress={onPress} style={{ width: '40%' }}>
			<Card.Content>
				{token ? (
					<>
						<Image source={{ uri: token.img }} style={{ width: 50, height: 50 }} />
						<Text>{token.symbol}</Text>
						<IconButton icon="chevron-right" color="#D0D0D0" />
						<TextInput
							keyboardType="numeric"
							style={{
								backgroundColor: '#FFFCF5',
								borderRadius: 20,
								borderColor: '#006AA6',
								borderStyle: 'solid',
								borderWidth: 1
							}}
							value={amount}
							ref={innerRef}
							onChangeText={(text) => onChangeText(text)}
						/>
					</>
				) : (
					<Text>Choose token</Text>
				)}
			</Card.Content>
		</Card>
	);
};

export default TokenCard;
