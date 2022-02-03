import React, { useEffect } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { State, useState } from '@hookstate/core';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { ExchangeState, globalExchangeState } from '@stores/ExchangeStore';
import { network } from '@src/model/network';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
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
	// const exchange: State<ExchangeState> = useState(globalExchangeState());
	// exchange.gas.set({ type: 'normal', gweiValue: gasPrice.average, gweiPrice, wait: gasPrice.avgWait } as Gas);

	useEffect(() => {
		const fetchGas = async () => {
			const gas = await estimateGas();
			const {
				result: { UsdPrice: usd }
			} = gas;
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
		return <ActivityIndicator size={24} color={colors.primary} />;
	}

	const {
		result: { ProposeGasPrice: normal, SafeGasPrice: slow, FastGasPrice: fast }
	} = gasPrice;

	if (!usdPrice) {
		return <ActivityIndicator size={24} color={colors.primary} />;
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
					<GasOption
						type="slow"
						gweiValue={+slow}
						usdPrice={usdPrice}
						wait={waitingTimes[slow as keyof WaitingTimes] || 30}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default GasSelector;
