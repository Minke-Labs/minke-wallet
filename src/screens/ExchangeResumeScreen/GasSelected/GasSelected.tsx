import React, { useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Paper2, GasOptionInner } from '@components';
import { State, useState } from '@hookstate/core';
import { estimateGas, getEthLastPrice, estimateConfirmationTime } from '@models/wallet';
import { ExchangeState, globalExchangeState, Gas } from '@stores/ExchangeStore';
import { network } from '@models/network';

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

export const GasSelected = () => {
	const [gasPrice, setGasPrice] = React.useState<number>();
	const [usdPrice, setUsdPrice] = React.useState<number>();
	const [wait, setWait] = React.useState<number>(0);
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const { type: selectedType } = exchange.gas.value || {};

	const fetchGas = async () => {
		const gas = await estimateGas();
		const {
			result: { UsdPrice: usd, ProposeGasPrice: normal, FastGasPrice: fast, SafeGasPrice: slow }
		} = gas;

		let gasValue = normal;
		if (selectedType === 'fast') {
			gasValue = fast;
		} else if (selectedType === 'slow') {
			gasValue = slow;
		}
		setGasPrice(+gasValue);
		if (!exchange.gas.value && selectedType === 'fast') {
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

	useEffect(() => {
		fetchGas();
	}, []);

	const waiting = useCallback(() => {
		if (wait) {
			if (wait > 60) {
				return `~ ${wait / 60} min`;
			}
			return `~ ${wait} secs`;
		}
		return null;
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
					setWait(defaultWait[selectedType as keyof Wait]);
				}
			}
		};

		fetchConfirmationTimes();
	}, [gasPrice]);

	return (
		<Paper2 p="xs" m="xs">
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<GasOptionInner
					type={selectedType!}
					gasPrice={gasPrice!}
					usdPrice={usdPrice!}
					waiting={waiting()}
				/>
			</View>
		</Paper2>
	);
};
