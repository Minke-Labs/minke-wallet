import React, { useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { State, useState } from '@hookstate/core';
import { ExchangeState, Gas, globalExchangeState } from '@src/stores/ExchangeStore';
import { network } from '@src/model/network';
import { estimateConfirmationTime, estimateGas, EstimateGasResponse, getEthLastPrice } from '@models/wallet';
import GasOption from './GasOption';
import { makeStyles } from './styles';

interface WaitingTimes {
	['key']?: number;
}

const GasSelector = () => {
	const [gasPrice, setGasPrice] = React.useState<EstimateGasResponse>();
	const [usdPrice, setUsdPrice] = React.useState<number>();
	const [waitingTimes, setWaitingTimes] = React.useState<WaitingTimes>({});
	const exchange: State<ExchangeState> = useState(globalExchangeState());

	useEffect(() => {
		const fetchGas = async () => {
			const gas = await estimateGas();
			const {
				result: { UsdPrice: usd, ProposeGasPrice: normal }
			} = gas;

			if (!exchange.gas.value) {
				exchange.gas.set({ type: 'normal', gweiValue: +normal } as Gas);
			}
			setGasPrice(gas);
			if (usd) {
				setUsdPrice(+usd);
			} else {
				const {
					result: { ethusd }
				} = await getEthLastPrice();
				setUsdPrice(+ethusd);
			}
		};

		fetchGas();
	}, []);

	useEffect(() => {
		const fetchConfirmationTimes = async () => {
			if (gasPrice) {
				const { transactionTimesEndpoint } = await network();
				if (transactionTimesEndpoint) {
					const {
						result: { ProposeGasPrice: normal, SafeGasPrice: slow, FastGasPrice: fast }
					} = gasPrice;
					const times = [normal, slow, fast].filter((v, i, a) => a.indexOf(v) === i);
					const waitings: WaitingTimes = {};
					times.forEach(async (time) => {
						const { result } = await estimateConfirmationTime(+time * 1000000000);
						waitings[time as keyof WaitingTimes] = +result;
					});
					setWaitingTimes(waitings);
				}
			}
		};

		fetchConfirmationTimes();
	}, [gasPrice]);

	const { colors } = useTheme();
	const styles = makeStyles(colors);

	if (!gasPrice) {
		return <ActivityIndicator size={24} color={colors.primary} style={styles.scrollviewHorizontal} />;
	}

	const {
		result: { ProposeGasPrice: normal, FastGasPrice: fast }
	} = gasPrice;

	if (!usdPrice) {
		return <ActivityIndicator size={24} color={colors.primary} style={styles.scrollviewHorizontal} />;
	}

	return (
		<SafeAreaView>
			<ScrollView
				style={styles.scrollviewHorizontal}
				horizontal
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
			>
				<View style={styles.scrollviewHorizontalContent}>
					<GasOption
						type="normal"
						gweiValue={+normal}
						usdPrice={usdPrice}
						wait={waitingTimes[normal as keyof WaitingTimes] || 5}
					/>
					<GasOption
						type="fast"
						gweiValue={+fast}
						usdPrice={usdPrice}
						wait={waitingTimes[fast as keyof WaitingTimes] || 10}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default GasSelector;
