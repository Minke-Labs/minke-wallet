import React, { useState } from 'react';
import { View } from 'react-native';
import { runOnJS, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { useVector } from 'react-native-redash';
import Main from './Main';
import Selection from './Selection';
import Header from './Header';
import { buildGraph } from './Graph.utils';
import { GraphIndex } from './Graph.types';

interface ChartProps {
	all: any;
	hour: any;
	day: any;
	week: any;
	month: any;
	year: any;
}

const Chart: React.FC<ChartProps> = ({ all, hour, day, week, month, year }) => {
	const [percChange, setPercChange] = useState(0);
	const translation = useVector();
	const transition = useSharedValue(0);
	const previous = useSharedValue<GraphIndex>(0);
	const current = useSharedValue<GraphIndex>(0);

	const graphs = [
		{
			label: '1H',
			value: 0,
			data: buildGraph(hour, 'Last Hour')
		},
		{
			label: '1D',
			value: 1,
			data: buildGraph(day, 'Last Day')
		},
		{
			label: '1W',
			value: 2,
			data: buildGraph(week, 'Last Week')
		},
		{
			label: '1M',
			value: 3,
			data: buildGraph(month, 'Last Month')
		},
		{
			label: '1Y',
			value: 4,
			data: buildGraph(year, 'This Year')
		},
		{
			label: 'All',
			value: 5,
			data: buildGraph(all, 'All time')
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
