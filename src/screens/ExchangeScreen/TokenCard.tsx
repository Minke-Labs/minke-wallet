/* eslint-disable no-useless-escape */

import React, { useState, useEffect, RefObject } from 'react';
import { TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@hooks';
import { ParaswapToken } from '@models/token';
import { Text, Icon, Token, Input } from '@components';
import { TokenType } from '@styles';
import { makeStyles } from './ExchangeScreen.styles';

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
	onPress?: (() => void) | undefined;
	balance: string;
	innerRef?: RefObject<TextInput>;
	disableMax?: boolean;
	updateQuotes?: Function;
	conversionAmount?: string;
}) => {
	const [amount, setAmount] = useState('');
	// if enabled always set the max according to the balance
	const [maxModeEnabled, setMaxModeEnabled] = useState(false);
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const onChangeText = (value: string) => {
		let lastValid = amount;
		const validNumber = new RegExp(/^\d*\,?\d*$/); // for comma
		if (validNumber.test(value)) {
			lastValid = value;
		} else {
			lastValid = amount;
		}
		setAmount(lastValid);
		setMaxModeEnabled(false);
	};

	const onMaxPress = () => {
		setMaxModeEnabled(true);
		setAmount(balance.replace(/\./g, ','));
	};

	useEffect(() => {
		setAmount('');
		setMaxModeEnabled(false);
		if (updateQuotes) updateQuotes('');
	}, [token]);

	useEffect(() => {
		if (updateQuotes && amount && !(conversionAmount && conversionAmount.replace(/\./g, ',') === amount)) {
			updateQuotes(amount);
		}
	}, [amount]);

	useEffect(() => {
		setAmount(conversionAmount.replace(/\./g, ','));
	}, [conversionAmount]);

	useEffect(() => {
		if (maxModeEnabled && !disableMax && conversionAmount) {
			onMaxPress();
		}
	}, [balance]);

	const isMaxEnabled = !disableMax && token && balance;
	const invalidAmount = isMaxEnabled && +balance < +amount.replace(/\,/g, '.');

	if (!token) {
		return (
			<TouchableOpacity onPress={onPress}>
				<View style={styles.tokenCardWrap}>
					<View style={styles.tokenCardCoinContent}>
						<View style={styles.selectTokenRow}>
							<View style={styles.currencyIcon}>
								<Icon name="dollarStroke" color="cta1" size={32} />
							</View>
							<Text type="p2">Choose token</Text>
							<Icon name="chevronRight" color="cta1" size={16} />
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	return (
		<View style={styles.tokenCardWrap}>
			<View style={styles.tokenCardCoinContent}>
				<TouchableOpacity onPress={onPress}>
					<View style={styles.tokenCardCoin}>
						<View style={styles.tokenImageContainer}>
							<Token name={(token.symbol || '').toLowerCase() as TokenType} size={34} glow />
						</View>
						<Text type="p2" style={styles.tokenName} weight="extraBold">
							{token.symbol}
						</Text>
						<Icon name="chevronRight" color="cta1" size={16} />
					</View>
				</TouchableOpacity>
				<Input
					keyboardType="numeric"
					style={{ flex: 1 }}
					error={invalidAmount as boolean}
					value={amount}
					ref={innerRef}
					onChangeText={(text) => onChangeText(text)}
					small
				/>
			</View>
			{isMaxEnabled && (
				<View style={styles.tokenCardMaxButtonContent}>
					<TouchableOpacity onPress={onMaxPress} style={styles.tokenCardMaxButton}>
						<Icon name="sparkleStroke" size={16} color="cta1" />
						<Text type="a" color="cta1" style={styles.tokenCardMaxButtonText}>
							Max
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default TokenCard;
