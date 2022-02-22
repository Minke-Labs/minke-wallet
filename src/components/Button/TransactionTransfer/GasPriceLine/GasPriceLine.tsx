import React from 'react';
import { Text } from 'react-native-paper';

interface Timmings {
	Low: string;
	Normal: string;
	Fast: string;
}

const timmings: Timmings = {
	Low: '30 secs',
	Normal: '10 secs',
	Fast: '5 secs'
};

const GasPriceLine = ({ gas, label, priceUSD }: { gas: number; label: string; priceUSD: number }) => {
	const coinValue = gas * 21000 * 10 ** -9;

	// useEffect(() => {
	// disabled for now because polygon does not have this endpoint.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const fetchTimes = async () => {
	// const { result } = await estimateTransactionTime(parseUnits(gas, 'gwei'));
	// setSeconds(+result);
	// };

	// fetchTimes();
	// }, []);

	return (
		<Text>
			Speed: {label} ~{timmings[label as keyof Timmings]} | $
			{(coinValue * priceUSD).toString().match(/^-?\d+(?:\.\d{0,6})?/)} Network Fee
		</Text>
	);
};

export default GasPriceLine;
