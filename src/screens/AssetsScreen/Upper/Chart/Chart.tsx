import React, { useState } from 'react';
import { View } from 'react-native';
import Animated, { runOnJS, useDerivedValue, SharedValue, interpolate } from 'react-native-reanimated';
import { Vector, round } from 'react-native-redash';
import Main from './Main/Main';
import Selection from './Selection/Selection';
import Header from './Header/Header';
import { buildGraph, width } from './Chart.utils';
import { Prices, GraphIndex } from './Chart.types';
import Changes from './Changes/Changes';

interface ChartProps {
	translation: Vector<Animated.SharedValue<number>>;
	previous: SharedValue<GraphIndex>;
	transition: SharedValue<number>;
	current: SharedValue<GraphIndex>;
	tokenHistory: any;
}

const Chart: React.FC<ChartProps> = ({ tokenHistory, current, translation, previous, transition }) => {
	const [percChange, setPercChange] = useState(0);
	const values = tokenHistory.data.prices as Prices;

	const graphs = [
		{
			label: '1H',
			value: 0,
			data: buildGraph(values.hour, 'Last Hour')
		},
		{
			label: '1D',
			value: 1,
			data: buildGraph(values.day, 'Last Day')
		},
		{
			label: '1W',
			value: 2,
			data: buildGraph(values.week, 'Last Week')
		},
		{
			label: '1M',
			value: 3,
			data: buildGraph(values.month, 'Last Month')
		},
		{
			label: '1Y',
			value: 4,
			data: buildGraph(values.year, 'This Year')
		},
		{
			label: 'All',
			value: 5,
			data: buildGraph(values.all, 'All time')
		}
	] as const;

	const setOnJSThread = (currentValue: any) => {
		setPercChange(graphs[currentValue].data.percentChange);
	};

	useDerivedValue(() => {
		runOnJS(setOnJSThread)(current.value);
	});

	const data = useDerivedValue(() => graphs[current.value].data);
	const price = useDerivedValue(() => {
		const p = interpolate(translation.y.value, [0, width], [data.value.maxPrice, data.value.minPrice]);
		return `$ ${round(p, 2).toLocaleString('en-US', { currency: 'USD' })}`;
	});

	return (
		<View style={{ flex: 1 }}>
			<Header {...{ current, price, percChange, graphs }} />
			<Main {...{ previous, current, transition, translation, percChange, graphs }} />
			<Selection {...{ previous, current, transition, graphs }} />
			<Changes {...{ current, graphs, percChange }} />
		</View>
	);
};
export default Chart;
