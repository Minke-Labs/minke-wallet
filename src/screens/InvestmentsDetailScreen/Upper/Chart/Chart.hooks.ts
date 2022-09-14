import { useState } from 'react';
import Animated, { runOnJS, useDerivedValue, interpolate, SharedValue } from 'react-native-reanimated';
import { round, Vector } from 'react-native-redash';
import { screenWidth } from '@styles';
import { buildGraph } from './Chart.utils';
import { Prices, GraphIndex } from './Chart.types';

interface UseChartProps {
	tokenHistory: any;
	current: SharedValue<GraphIndex>;
	translation: Vector<Animated.SharedValue<number>>;
}

export const useChart = ({ tokenHistory, current, translation }: UseChartProps) => {
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
		const p = interpolate(translation.y.value, [0, screenWidth], [data.value.maxPrice, data.value.minPrice]);
		return `$ ${round(p, 2).toLocaleString('en-US', { currency: 'USD' })}`;
	});

	return {
		graphs,
		price,
		percChange
	};
};
