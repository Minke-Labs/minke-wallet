/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useVector } from 'react-native-redash';
import { getTokenHistory } from '@models/token';
import Chart from './Chart/Chart';
import Header from './Header/Header';
import { GraphIndex, UpperProps } from './Upper.types';

export const Upper: React.FC<UpperProps> = ({ coin }) => {
	const [tokenHistory, setTokenHistory] = useState<any>(null);
	const translation = useVector();
	const transition = useSharedValue(0);
	const previous = useSharedValue<GraphIndex>(0);
	const current = useSharedValue<GraphIndex>(0);

	const fetchTokenHistory = async () => {
		const res = await getTokenHistory(coin.id);
		if (res.errors) {
			const res = await getTokenHistory(coin.name);
			if (res.errors) {
				const res = await getTokenHistory(coin.symbol);
				if (res.errors) {
					setTokenHistory(null);
				} else {
					setTokenHistory(res);
				}
			} else {
				setTokenHistory(res);
			}
		} else {
			setTokenHistory(res);
		}
	};

	useEffect(() => {
		fetchTokenHistory();
	}, []);

	return (
		<>
			<Header {...{ coin }} />
			{tokenHistory ? (
				<Chart
					{...{
						tokenHistory,
						current,
						previous,
						transition,
						translation
					}}
				/>
			) : (
				<View style={{ height: 390 }} />
			)}
		</>
	);
};
