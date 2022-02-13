import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { ReText, Vector, round } from 'react-native-redash';

import ETH from './ETH';
import { graphs, width } from './Graph.utils';
import { GraphIndex } from './Graph.types';

const styles = StyleSheet.create({
	container: {
		padding: 16,
		borderWidth: 1,
		borderColor: 'purple'
	},
	values: {
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	value: {
		fontWeight: '500',
		fontSize: 24
	},
	label: {
		fontSize: 18
	}
});

interface HeaderProps {
	translation: Vector<Animated.SharedValue<number>>;
	index: Animated.SharedValue<GraphIndex>;
}

const Header = ({ translation, index }: HeaderProps) => {
	const data = useDerivedValue(() => graphs[index.value].data);
	const price = useDerivedValue(() => {
		const p = interpolate(translation.y.value, [0, width], [data.value.maxPrice, data.value.minPrice]);
		return `$ ${round(p, 2).toLocaleString('en-US', { currency: 'USD' })}`;
	});
	const percentChange = useDerivedValue(() => `${round(data.value.percentChange, 3)}%`);
	const label = useDerivedValue(() => data.value.label);
	const style = useAnimatedStyle(() => ({
		fontWeight: '500',
		fontSize: 24,
		color: data.value.percentChange > 0 ? 'green' : 'red'
	}));
	return (
		<View style={styles.container}>
			<ETH />
			<View style={styles.values}>
				<View>
					<ReText style={styles.value} text={price} />
					<Text style={styles.label}>Etherum</Text>
				</View>
				<View>
					<ReText style={style} text={percentChange} />
					<ReText style={styles.label} text={label} />
				</View>
			</View>
		</View>
	);
};

export default Header;
