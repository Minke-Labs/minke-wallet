import React, { useCallback, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import { Text, Icon, ActivityIndicator } from '@components';
import { estimateConfirmationTime, estimateGas, getEthLastPrice } from '@models/wallet';
import { network } from '@models/network';
import { tokenBalanceFormat } from '@helpers/utilities';
import { ExchangeState, Gas, globalExchangeState } from '@stores/ExchangeStore';
import { State, useState } from '@hookstate/core';
import { makeStyles } from './GasOption.styles';
import Radio from './Radio/Radio';

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
	const { i18n } = useLanguage();
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
		<TouchableOpacity onPress={onSelectGas} disabled={disabled} activeOpacity={0.6}>
			<View style={[styles.container, selected ? styles.selectedCard : {}]}>
				<View style={styles.content}>

					<Radio selected={selected} />

					<View style={styles.icon}>
						<Icon
							name={type === 'fast' ? 'boltStroke' : 'clockStroke'}
							size={20}
							color="cta1"
						/>
					</View>

					<View style={{ marginRight: 16 }}>
						<Text type="span" weight="bold">
							{i18n.t(`ExchangeScreen.GasSelector.GasOption.${type}`)}
						</Text>
						<Text type="span">{waiting()}</Text>
					</View>

					<View style={{ alignItems: 'flex-end' }}>
						<Text type="span" weight="bold">
							${tokenBalanceFormat(gasPrice * 41000 * 10 ** -9 * usdPrice, 5)}
						</Text>
						<Text type="span">
							{i18n.t('ExchangeScreen.GasSelector.GasOption.transaction_fee')}
						</Text>
					</View>

				</View>
			</View>
		</TouchableOpacity>
	);
};

export default GasOption;
