import React, { useCallback, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, RadioButton } from 'react-native-paper';
import { useTheme } from '@hooks';
import { Text, Icon as IconImg, ActivityIndicator } from '@components';
import { estimateConfirmationTime, estimateGas, getEthLastPrice } from '@src/model/wallet';
import { network } from '@models/network';
import { ExchangeState, Gas, globalExchangeState } from '@src/stores/ExchangeStore';
import { State, useState } from '@hookstate/core';
import { makeStyles } from './ExchangeScreen.styles';

interface Wait {
	normal: number;
	fast: number;
	slow: number;
}

const defaultWait: Wait = {
	slow: 30,
	normal: 10,
	fast: 5
};

const GasOption = ({ type, disabled = false }: { type: 'normal' | 'fast' | 'slow'; disabled?: boolean }) => {
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const [gasPrice, setGasPrice] = React.useState<number>();
	const [usdPrice, setUsdPrice] = React.useState<number>();
	const [wait, setWait] = React.useState<number>(0);
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const fetchGas = async () => {
		const gas = await estimateGas();
		const {
			result: { UsdPrice: usd, ProposeGasPrice: normal, FastGasPrice: fast, SafeGasPrice: slow }
		} = gas;

		let gasValue = normal;
		if (type === 'fast') {
			gasValue = fast;
		} else if (type === 'slow') {
			gasValue = slow;
		}
		setGasPrice(+gasValue);
		if (!exchange.gas.value && type === 'normal') {
			exchange.gas.set({
				type: 'normal',
				gweiValue: +normal,
				wait: defaultWait.normal
			} as Gas);
		}
		if (usd) {
			// matic network includes the USD price in the payload
			setUsdPrice(+usd);
		} else {
			const {
				result: { ethusd }
			} = await getEthLastPrice();
			setUsdPrice(+ethusd);
		}
	};

	const waiting = useCallback(() => {
		if (wait) {
			if (wait > 60) {
				return `~ ${wait / 60} min`;
			}
			return `~ ${wait} secs`;
		}
		return <ActivityIndicator size={16} />;
	}, [wait]);

	useEffect(() => {
		fetchGas();
	}, []);

	useEffect(() => {
		// ethereum network has this endpoint to check the times
		const fetchConfirmationTimes = async () => {
			if (gasPrice) {
				const { transactionTimesEndpoint } = await network();
				if (transactionTimesEndpoint) {
					const { result } = await estimateConfirmationTime(gasPrice * 1000000000);
					if (Number.isNaN(+result)) {
						setTimeout(() => {
							fetchConfirmationTimes();
						}, 5000);
					} else {
						setWait(+result);
					}
				} else {
					setWait(defaultWait[type as keyof Wait]);
				}
			}
		};

		fetchConfirmationTimes();
	}, [gasPrice]);

	const { type: selectedType } = exchange.gas.value || {};
	const selected = selectedType === type;

	useEffect(() => {
		const intervalId = setInterval(() => {
			fetchGas();
		}, 15000);

		return () => clearInterval(intervalId);
	}, [type, useState]);

	useEffect(() => {
		if (selected) {
			exchange.gas.merge({ usdPrice, wait: wait || defaultWait[type as keyof Wait], gweiValue: gasPrice });
		}
	}, [gasPrice, usdPrice, wait]);

	const Icon = useCallback(() => {
		switch (type) {
			case 'fast':
				return <IconImg name="boltStroke" size={20} color="cta1" />;
			default:
				return <IconImg name="clockStroke" size={20} color="cta1" />; // normal
		}
	}, []);

	const onSelectGas = () => {
		exchange.gas.set({ type, gweiValue: gasPrice, usdPrice, wait: wait || defaultWait[type as keyof Wait] } as Gas);
	};

	if (!gasPrice || !usdPrice) {
		return <ActivityIndicator size={24} style={styles.scrollviewHorizontal} />;
	}

	return (
		<TouchableOpacity onPress={onSelectGas} disabled={disabled}>
			<Card style={[styles.gasSelectorCard, selected ? styles.selectedCard : {}]}>
				<Card.Content style={styles.gasSelectorCardContent}>
					<View style={{ marginRight: 4 }}>
						<RadioButton
							value={type}
							status={selected ? 'checked' : 'unchecked'}
							onPress={onSelectGas}
							color={colors.cta1}
						/>
					</View>
					<View style={styles.gasSelectorCardIcon}>
						<Icon />
					</View>
					<View style={styles.gasSelectorCardGasOption}>
						<Text type="span" weight="bold">
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</Text>
						<Text type="span">{waiting()}</Text>
					</View>
					<View style={styles.alignRight}>
						<Text type="span" weight="bold">
							${(gasPrice * 41000 * 10 ** -9 * usdPrice).toString().match(/^-?\d+(?:\.\d{0,5})?/)}
						</Text>
						<Text type="span">Transaction Fee</Text>
					</View>
				</Card.Content>
			</Card>
		</TouchableOpacity>
	);
};

export default GasOption;
