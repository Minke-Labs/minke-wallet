import React, { useEffect, useCallback } from 'react';
import { Paper, GasOptionInner } from '@components';
import { State, useState } from '@hookstate/core';
import { estimateGas, getEthLastPrice, estimateConfirmationTime } from '@models/wallet';
import { ExchangeState, globalExchangeState, Gas } from '@stores/ExchangeStore';
import { parseUnits } from 'ethers/lib/utils';
import { Network } from '@models/network';

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

export const GasSelected = ({ gasLimit, network }: { gasLimit: number; network: Network }) => {
	const [gasPrice, setGasPrice] = React.useState<number>();
	const [usdPrice, setUsdPrice] = React.useState<number>();
	const [wait, setWait] = React.useState<number>(0);
	const exchange: State<ExchangeState> = useState(globalExchangeState());
	const { type: selectedType } = exchange.gas.value || {};

	const fetchGas = async () => {
		const gas = await estimateGas(network);
		const {
			result: { UsdPrice: usd, ProposeGasPrice: normal, FastGasPrice: fast, SafeGasPrice: slow, suggestBaseFee }
		} = gas;

		let gasValue = normal;
		if (selectedType === 'fast') {
			gasValue = fast;
		} else if (selectedType === 'slow') {
			gasValue = slow;
		}
		setGasPrice(+gasValue);
		if (!exchange.gas.value && selectedType === 'fast') {
			const maxPriorityFeePerGas = parseUnits(fast, 'gwei');
			const maxFeePerGas = parseUnits(suggestBaseFee, 'gwei').add(maxPriorityFeePerGas);
			exchange.gas.set({
				type: 'fast',
				maxFeePerGas,
				maxPriorityFeePerGas,
				wait: defaultWait.fast
			} as Gas);
		}
		if (usd) {
			// matic network includes the USD price in the payload
			setUsdPrice(+usd);
		} else {
			const {
				result: { ethusd }
			} = await getEthLastPrice(network);
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
				const { transactionTimesEndpoint } = network;
				if (transactionTimesEndpoint) {
					const { result } = await estimateConfirmationTime(gasPrice * 1000000000, network);
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
		<Paper row cross="center" p="xs" m="xs" mh="xs">
			<GasOptionInner
				type={selectedType!}
				gasPrice={gasPrice!}
				usdPrice={usdPrice!}
				waiting={waiting()}
				gasLimit={gasLimit}
				network={network}
			/>
		</Paper>
	);
};
