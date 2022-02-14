import * as shape from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { Dimensions } from 'react-native';
import { parse } from 'react-native-redash';
import data from './data.json';
import { Prices } from './Graph.types';

const values = data.data.prices as Prices;

const POINTS = 60;
export const height = 263;
export const { width } = Dimensions.get('window');

type PriceList = [string, number][];

interface DataPoints {
	percent_change: number;
	prices: PriceList;
}

const buildGraph = (datapoints: DataPoints, label: string) => {
	const priceList = datapoints.prices.slice(0, POINTS);

	// I REVERSED IT HERE BECAUSE THE API ORDER DATE IS DESC, AND THE AREA WON'T WORK OTHERWISE
	const formattedValues = priceList
		.slice(0)
		.reverse()
		.map((price) => [parseFloat(price[0]), price[1]] as [number, number]);

	const prices = formattedValues.map((value) => value[0]);
	const dates = formattedValues.map((value) => value[1]);

	const minDate = Math.min(...dates);
	const maxDate = Math.max(...dates);

	const scaleX = scaleLinear().domain([minDate, maxDate]).range([0, width]);

	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);

	const scaleY = scaleLinear().domain([minPrice, maxPrice]).range([height, 0]);

	const d = parse(
		shape
			.line()
			.x((p) => scaleX(p[1]))
			.y((p) => scaleY(p[0]))
			.curve(shape.curveBasis)(formattedValues) as string
	);

	return {
		label,
		scaleX,
		scaleY,
		minPrice,
		maxPrice,
		percentChange: datapoints.percent_change,
		path: d
	};
};

export const graphs = [
	{
		label: '1H',
		value: 0,
		data: buildGraph(values.hour, 'Last Hour')
	},
	{
		label: '1D',
		value: 1,
		data: buildGraph(values.day, 'Today')
	},
	{
		label: '1M',
		value: 2,
		data: buildGraph(values.month, 'Last Month')
	},
	{
		label: '1Y',
		value: 3,
		data: buildGraph(values.year, 'This Year')
	},
	{
		label: 'All',
		value: 4,
		data: buildGraph(values.all, 'All time')
	}
] as const;
