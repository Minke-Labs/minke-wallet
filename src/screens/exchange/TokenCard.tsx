/* eslint-disable no-useless-escape */
/* eslint-disable prefer-regex-literals */
import React, { useState, useEffect, RefObject } from 'react';
import { Image, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton, Text } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ParaswapToken } from '../../model/token';
import styles from './styles';

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
		<View>
			<View style={styles.tokenCardCoinContent}>
				<TouchableOpacity onPress={onPress}>
					{token ? (
						<View style={styles.tokenCardCoin}>
							<View style={styles.tokenImageContainer}>
								<Image source={{ uri: token.img }} style={styles.tokenImage} />
							</View>
							<Text style={styles.tokenName}>{token.symbol}</Text>
							<MaterialIcon name="chevron-right" color="#006AA6" size={20} />
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
						textAlign: 'right',
						paddingRight: 16,
						display: token ? 'flex' : 'none',
						flex: 1
					}}
					value={amount}
					ref={innerRef}
					onChangeText={(text) => onChangeText(text)}
				/>
			</View>
			{isMaxEnabled ? (
				<TouchableOpacity
					onPress={() => setAmount(balance.replace(/\./g, ','))}
					style={styles.tokenCardMaxButton}
				>
					<View style={styles.tokenCardMaxButtonContent}>
						<MaterialIcon name="currency-usd" size={20} />
						<Text>Max</Text>
					</View>
				</TouchableOpacity>
			) : null}
		</View>
	);
};

export default TokenCard;
