import React, { useEffect, useCallback } from 'react';
import { useTheme } from '@hooks';
import { View, ScrollView } from 'react-native';
import { ExchangeState, Gas, globalExchangeState } from '@stores/ExchangeStore';
import { State, useState } from '@hookstate/core';
import { estimateConfirmationTime, estimateGas, getEthLastPrice } from '@models/wallet';
import { network } from '@models/network';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import GasOption from '../GasOption/GasOption';
import styles from './GasSelector.styles';

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

type Speeds = 'fast' | 'normal' | 'slow';
type Price = { [key: string]: number };
type WaitTime = { [key: string]: number | null };

const GasSelector = () => {
	const [type, setType] = React.useState<Speeds>('fast');
	const { colors } = useTheme();

	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const [gasPrice, setGasPrice] = React.useState<Price>({});
	const [usdPrice, setUsdPrice] = React.useState<number>();
	const [wait, setWait] = React.useState<WaitTime>({});

	const { type: selectedType } = exchange.gas.value || {};
	const selected = selectedType === type;

	const fetchGas = async () => {
		const gas = await estimateGas();
		const {
			result: { UsdPrice: usd, ProposeGasPrice: normal, FastGasPrice: fast }
		} = gas;

		setGasPrice({ normal: +normal, fast: +fast });
		if (!exchange.gas.value && type === 'fast') {
			exchange.gas.set({
				type: 'fast',
				gweiValue: +fast,
				wait: defaultWait.fast
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

	const waiting = useCallback(
		(waitType: string) => {
			const waitValue = wait[waitType];
			if (waitValue) {
				if (waitValue > 60) {
					return `~ ${waitValue / 60} min`;
				}
				return `~ ${waitValue} secs`;
			}

			return null;
		},
		[wait]
	);

	useEffect(() => {
		fetchGas();
	}, []);

	useEffect(() => {
		const fetchConfirmation = async (gasType: string) => {
			const value = gasPrice[gasType];
			const { result } = await estimateConfirmationTime(value * 1000000000);
			if (!Number.isNaN(+result)) {
				return +result;
			}
			return null;
		};

		// ethereum network has this endpoint to check the times
		const fetchConfirmationTimes = async () => {
			if (gasPrice) {
				const { transactionTimesEndpoint } = await network();
				if (transactionTimesEndpoint) {
					const result = await fetchConfirmation(type);
					setWait({ [type]: result });
				} else {
					const allWait = defaultWait[type as keyof Wait];
					setWait({ normal: allWait, fast: allWait });
				}
			}
		};

		fetchConfirmationTimes();
	}, [selectedType]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			fetchGas();
		}, 15000);

		return () => clearInterval(intervalId);
	}, [type, useState]);

	useEffect(() => {
		if (selected) {
			exchange.gas.merge({
				usdPrice,
				wait: wait[type] || defaultWait[type as keyof Wait],
				gweiValue: gasPrice[type]
			});
		}
	}, [gasPrice, usdPrice, wait]);

	const onSelectGas = (val: Speeds) => {
		exchange.gas.set({
			type: val,
			gweiValue: gasPrice[val],
			usdPrice,
			wait: wait[val] || defaultWait[type as keyof Wait]
		} as Gas);
	};

	const handleClick = (val: Speeds) => {
		setType(val);
		onSelectGas(val);
	};

	if (!gasPrice || !usdPrice) {
		return (
			<ActivityIndicator
				size={24}
				style={{
					marginTop: 24,
					marginBottom: 24,
					paddingLeft: 0
				}}
			/>
		);
	}

	return (
		<View style={{ alignItems: 'center' }}>
			<ScrollView
				style={{ marginBottom: 12 }}
				horizontal
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.container}>
					<GasOption
						type="fast"
						onSelectGas={() => handleClick('fast')}
						selected={type === 'fast'}
						gasPrice={gasPrice.fast}
						waiting={waiting('fast')}
						usdPrice={usdPrice}
					/>
					<GasOption
						type="normal"
						onSelectGas={() => handleClick('normal')}
						selected={type === 'normal'}
						gasPrice={gasPrice.normal}
						waiting={waiting('normal')}
						usdPrice={usdPrice}
					/>
				</View>
			</ScrollView>

			<View style={styles.indicatorContainer}>
				<View
					style={[
						styles.indicatorLeft,
						{
							backgroundColor: type === 'fast' ? colors.cta1 : colors.text5
						}
					]}
				/>
				<View
					style={[
						styles.indicatorRight,
						{
							backgroundColor: type === 'normal' ? colors.cta1 : colors.text5
						}
					]}
				/>
			</View>
		</View>
	);
};

export default GasSelector;
