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

const GasSelector = () => {
	const [type, setType] = React.useState<Speeds>('fast');
	const { colors } = useTheme();

	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const [gasPrice, setGasPrice] = React.useState<number>();
	const [usdPrice, setUsdPrice] = React.useState<number>();
	const [wait, setWait] = React.useState<number>(0);

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

	const onSelectGas = () => {
		exchange.gas.set({ type, gweiValue: gasPrice, usdPrice, wait: wait || defaultWait[type as keyof Wait] } as Gas);
	};

	const handleClick = (val: Speeds) => {
		onSelectGas();
		setType(val);
	};

	if (!gasPrice || !usdPrice) {
		return <ActivityIndicator
			size={24}
			style={{
				marginTop: 24,
				marginBottom: 24,
				paddingLeft: 0
			}}
		/>;
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
						{...{ gasPrice, usdPrice, waiting }}
					/>
					<GasOption
						type="normal"
						onSelectGas={() => handleClick('normal')}
						selected={type === 'normal'}
						{...{ gasPrice, usdPrice, waiting }}
					/>
				</View>
			</ScrollView>

			<View style={styles.indicatorContainer}>
				<View style={[styles.indicatorLeft, {
					backgroundColor: type === 'fast' ? colors.cta1 : colors.text5
				}]}
				/>
				<View style={[styles.indicatorRight, {
					backgroundColor: type === 'normal' ? colors.cta1 : colors.text5
				}]}
				/>
			</View>
		</View>
	);
};

export default GasSelector;
