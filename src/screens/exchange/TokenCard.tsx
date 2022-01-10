/* eslint-disable no-useless-escape */
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
						borderColor: invalidAmount ? 'red' : '#006AA6',
						borderStyle: 'solid',
						borderWidth: 1,
						display: token ? 'flex' : 'none'
					}}
					value={amount}
					ref={innerRef}
					onChangeText={(text) => onChangeText(text)}
				/>
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
