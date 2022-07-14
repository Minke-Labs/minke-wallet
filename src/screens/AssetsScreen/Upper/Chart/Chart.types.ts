import Animated, { SharedValue } from 'react-native-reanimated';
import { Vector } from 'react-native-redash';

interface ChartProps {
	translation: Vector<Animated.SharedValue<number>>;
	previous: SharedValue<GraphIndex>;
	transition: SharedValue<number>;
	current: SharedValue<GraphIndex>;
	tokenHistory: any;
}

interface Amount {
	amount: string;
	currency: string;
	scale: string;
}

interface PercentChange {
	hour: number;
	day: number;
	week: number;
	month: number;
	year: number;
}

interface LatestPrice {
	amount: Amount;
	timestamp: string;
	percent_change: PercentChange;
}

type PriceList = [string, number][];

interface DataPoints {
	percent_change: number;
	prices: PriceList;
}

interface Prices {
	latest: string;
	latest_price: LatestPrice;
	hour: DataPoints;
	day: DataPoints;
	week: DataPoints;
	month: DataPoints;
	year: DataPoints;
	all: DataPoints;
}

type GraphIndex = 0 | 1 | 2 | 3 | 4 | 5;

export {
	ChartProps, Amount, PercentChange, LatestPrice, PriceList, DataPoints, Prices, GraphIndex
};
