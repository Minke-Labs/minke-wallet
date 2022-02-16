/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect, RefObject } from 'react';
import { Image, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, IconButton, Text } from 'react-native-paper';
import { ParaswapToken } from '../../model/token';

const TokenCard = ({
	token,
	onPress,
	balance,
	innerRef,
	disableMax = false,
	updateQuotes,
	conversionAmount = ''
}: {
	token: ParaswapToken | undefined;
	onPress: (() => void) | undefined;
	balance: string;
	innerRef: RefObject<TextInput>;
	disableMax?: boolean;
	updateQuotes: Function;
	conversionAmount?: string;
}) => {
	const [amount, setAmount] = useState('');
	const onChangeText = (value: string) => {
		let lastValid = amount;
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
		updateQuotes(amount);
	}, [token]);

	useEffect(() => {
		if (!(conversionAmount && conversionAmount.replace(/\./g, ',') === amount)) {
			updateQuotes(amount);
		}
	}, [amount]);

	useEffect(() => {
		setAmount(conversionAmount.replace(/\./g, ','));
	}, [conversionAmount]);

	const isMaxEnabled = !disableMax && token && balance;
	const invalidAmount = isMaxEnabled && +balance < +amount.replace(/\,/g, '.');

	return (
		<Card style={{ borderRadius: 16 }}>
			<Card.Content>
				<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
					<TouchableOpacity onPress={onPress}>
						{token ? (
							<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
								<Image source={{ uri: token.img }} style={{ width: 50, height: 50 }} />
								<Text>{token.symbol}</Text>
								<IconButton icon="chevron-right" color="#D0D0D0" />
							</View>
						) : (
							<Text>Choose token</Text>
						)}
					</TouchableOpacity>
					<TextInput
						keyboardType="numeric"
						style={{
							backgroundColor: '#FFFCF5',
							borderRadius: 41,
							borderColor: invalidAmount ? 'red' : '#D0D0D0',
							borderStyle: 'solid',
							borderWidth: 1,
							display: token ? 'flex' : 'none',
							flex: 1
						}}
						value={amount}
						ref={innerRef}
						onChangeText={(text) => onChangeText(text)}
					/>
				</View>
				{isMaxEnabled ? (
					<TouchableOpacity onPress={() => setAmount(balance.replace(/\./g, ','))}>
						<Text>Max</Text>
					</TouchableOpacity>
				) : null}
			</Card.Content>
		</Card>
	);
};

export default TokenCard;
