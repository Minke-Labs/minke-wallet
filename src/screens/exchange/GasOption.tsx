/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback } from 'react';
import { Card, Text, RadioButton, useTheme } from 'react-native-paper';
import { View, TouchableOpacity } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ExchangeState, Gas, globalExchangeState } from '@src/stores/ExchangeStore';
import { State, useState } from '@hookstate/core';
import { makeStyles } from './styles';

interface Wait {
	normal: number;
	fast: number;
}

const defaultWait: Wait = {
	normal: 10,
	fast: 5
};

const GasOption = ({
	type,
	gweiValue,
	usdPrice,
	wait,
	disabled = false
}: {
	type: 'normal' | 'fast' | 'slow';
	gweiValue: number;
	usdPrice: number;
	wait: number;
	disabled: boolean;
}) => {
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const coinValue = gweiValue * 21000 * 10 ** -9;
	const gas = exchange.gas.value;

	const waiting = () => {
		if (wait > 60) {
			return `${wait / 60} min`;
		}
		return `${wait} secs`;
	};

	const Icon = useCallback(() => {
		switch (type) {
			case 'slow':
				return <MaterialIcon name="turtle" size={20} color={colors.primary} />;
			case 'fast':
				return <EntypoIcon name="flash" size={20} color={colors.primary} />;
			default:
				return <AntDesignIcon name="clockcircleo" size={20} color={colors.primary} />; // normal
		}
	}, []);

	const onSelectGas = () => {
		exchange.gas.set({ type, gweiValue, usdPrice, wait: wait || defaultWait[type as keyof Wait] } as Gas);
	};

	return (
		<TouchableOpacity onPress={onSelectGas} disabled={disabled}>
			<Card style={[styles.gasSelectorCard, gas && gas.type === type ? styles.selectedCard : {}]}>
				<Card.Content style={styles.gasSelectorCardContent}>
					<View style={{ marginRight: 4 }}>
						<RadioButton
							value={gas?.type || ''}
							status={gas && gas.type === type ? 'checked' : 'unchecked'}
							onPress={onSelectGas}
							color={colors.primary}
							uncheckedColor="red"
						/>
					</View>
					<View style={styles.gasSelectorCardIcon}>
						<Icon />
					</View>
					<View style={styles.gasSelectorCardGasOption}>
						<Text style={styles.textBold}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
						<Text>~ {waiting()}</Text>
					</View>
					<View style={styles.alignRight}>
						<Text style={styles.textBold}>
							${(coinValue * usdPrice).toString().match(/^-?\d+(?:\.\d{0,5})?/)}
						</Text>
						<Text>Transaction Fee</Text>
					</View>
				</Card.Content>
			</Card>
		</TouchableOpacity>
	);
};

export default GasOption;
