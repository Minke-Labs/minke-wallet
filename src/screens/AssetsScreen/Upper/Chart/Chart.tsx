import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { ColorType } from '@styles';
import Main from './Main/Main';
import Selection from './Selection/Selection';
import Header from './Header/Header';
import { ChartProps } from './Chart.types';
import Changes from './Changes/Changes';
import { useChart } from './Chart.hooks';

const Chart: React.FC<ChartProps> = ({ tokenHistory, current, translation, previous, transition }) => {
	const { graphs, price, percChange } = useChart({ tokenHistory, current, translation });
	const { colors } = useTheme();

	const chooseColor = (pChange: number, c: ColorType) => {
		if (pChange > 0) return c.alert3;
		if (pChange < 0) return c.alert1;
		return c.text4;
	};

	return (
		<View style={{ flex: 1 }}>
			<Header {...{ current, price, graphs }} />
			<Main
				color={chooseColor(percChange, colors)}
				{...{ previous, current, transition, translation, percChange, graphs }}
			/>
			<Selection {...{ previous, current, transition, graphs }} />
			<Changes color={chooseColor(percChange, colors)} {...{ tokenHistory, current, graphs }} />
		</View>
	);
};
export default Chart;
