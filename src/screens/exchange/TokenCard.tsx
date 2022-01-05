/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect, RefObject } from 'react';
import { Image, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, IconButton } from 'react-native-paper';
import { ParaswapToken } from '../../model/token';

const TokenCard = ({
	token,
	onPress,
	balance,
	innerRef,
	disableMax = false,
	updateQuotes
}: {
	token: ParaswapToken | undefined;
	onPress: (() => void) | undefined;
	balance: number;
	innerRef: RefObject<TextInput>;
	// eslint-disable-next-line react/require-default-props
	disableMax?: boolean;
	updateQuotes: Function;
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

	useEffect(() => {
		updateQuotes(amount);
	}, [amount]);

	return (
		<Card style={{ width: '40%', borderRadius: 16 }}>
			<Card.Content>
				<TouchableOpacity onPress={onPress}>
					{token ? (
						<>
							<Image source={{ uri: token.img }} style={{ width: 50, height: 50 }} />
							<Text>{token.symbol}</Text>
							<IconButton icon="chevron-right" color="#D0D0D0" />
						</>
					) : (
						<Text>Choose token</Text>
					)}
				</TouchableOpacity>
				<TextInput
					keyboardType="numeric"
					style={{
						backgroundColor: '#FFFCF5',
						borderRadius: 41,
						borderColor: '#006AA6',
						borderStyle: 'solid',
						borderWidth: 1,
						display: token ? 'flex' : 'none'
					}}
					value={amount}
					ref={innerRef}
					onChangeText={(text) => onChangeText(text)}
				/>
				{!disableMax && token && balance > 0 ? (
					<TouchableOpacity onPress={() => setAmount(balance.toString())}>
						<Text>Max</Text>
					</TouchableOpacity>
				) : null}
			</Card.Content>
		</Card>
	);
};

export default TokenCard;
