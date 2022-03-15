import React from 'react';
import { View } from 'react-native';
import Main from './Main/Main';
import Selection from './Selection/Selection';
import Header from './Header/Header';
import { ChartProps } from './Chart.types';
import Changes from './Changes/Changes';
import { useChart } from './Chart.hooks';

const Chart: React.FC<ChartProps> = ({ tokenHistory, current, translation, previous, transition }) => {
	const { graphs, price, percChange } = useChart({ tokenHistory, current, translation });

	return (
		<View style={{ flex: 1 }}>
			<Header {...{ current, price, graphs }} />
			<Main {...{ previous, current, transition, translation, percChange, graphs }} />
			<Selection {...{ previous, current, transition, graphs }} />
			<Changes {...{ tokenHistory, current, graphs }} />
		</View>
	);
};
export default Chart;
