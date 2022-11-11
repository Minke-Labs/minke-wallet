import React from 'react';
import { View } from 'react-native';
import Chart from './Chart/Chart';
import Header from './Header/Header';
import { UpperProps } from './Upper.types';
import { useUpper } from './Upper.hooks';

export const Upper: React.FC<UpperProps> = ({ coin }) => {
	const { tokenHistory, transition, previous, current, translation } = useUpper(coin);
	return (
		<>
			<Header coin={coin} />
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
