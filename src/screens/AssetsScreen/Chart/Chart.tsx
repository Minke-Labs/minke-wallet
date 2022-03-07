import React, { useState } from 'react';
import { View } from 'react-native';
import { runOnJS, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { useVector } from 'react-native-redash';
import Main from './Main/Main';
import Selection from './Selection/Selection';
import Header from './Header/Header';
import { buildGraph } from './Chart.utils';
import { GraphIndex, Prices, ChartProps } from './Chart.types';

const Chart: React.FC<ChartProps> = ({ data }) => {
	const [percChange, setPercChange] = useState(0);
	const translation = useVector();
	const transition = useSharedValue(0);
	const previous = useSharedValue<GraphIndex>(0);
	const current = useSharedValue<GraphIndex>(0);
	const values = data.data.prices as Prices;

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

	return (
		<View style={{ flex: 1 }}>
			<Header index={current} {...{ percChange, translation }} {...{ graphs }} />
			<Main {...{ previous, current, transition, translation, percChange }} {...{ graphs }} />
			<Selection {...{ previous, current, transition }} {...{ graphs }} />
		</View>
	);
};

export default Chart;
