import * as shape from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { parse } from 'react-native-redash';
import { screenWidth } from '@styles';
import { DataPoints } from './Chart.types';

const POINTS = 30;
export const height = 263;

export const buildGraph = (datapoints: DataPoints, label?: string) => {
	const { length } = datapoints.prices;
	const priceList = datapoints.prices.slice(0, Math.min(length, POINTS));

	// I REVERSED IT HERE BECAUSE THE API ORDER DATE IS DESC, AND THE AREA WON'T WORK OTHERWISE
	const formattedValues = priceList.reverse().map((price) => [parseFloat(price[0]), price[1]] as [number, number]);

	const prices = formattedValues.map((value) => value[0]);
	const dates = formattedValues.map((value) => value[1]);

	const minDate = Math.min(...dates);
	const maxDate = Math.max(...dates);

	const scaleX = scaleLinear().domain([minDate, maxDate]).range([0, screenWidth]);

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
