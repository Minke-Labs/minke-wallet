import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import { mixPath, Vector } from 'react-native-redash';
import { width, height, graphs } from './Graph.utils';
import Cursor from './Cursor';

const styles = StyleSheet.create({
	container: {
		width,
		height,
		borderColor: 'green',
		borderWidth: 2
	}
});

const AnimatedPath = Animated.createAnimatedComponent(Path);

type GraphIndex = 0 | 1 | 2 | 3 | 4;

interface ChartProps {
	previous: SharedValue<GraphIndex>;
	transition: SharedValue<number>;
	current: SharedValue<GraphIndex>;
	translation: Vector<Animated.SharedValue<number>>;
}

const Chart: React.FC<ChartProps> = ({ previous, current, transition, translation }) => {
	const animatedPropsLine = useAnimatedProps(() => {
		const previousPath = graphs[previous.value].data.path;
		const currentPath = graphs[current.value].data.path;
		return {
			d: mixPath(transition.value, previousPath, currentPath)
		};
	});

	const animatedPropsBg = useAnimatedProps(() => {
		const previousPath = graphs[previous.value].data.path;
		const currentPath = graphs[current.value].data.path;
		return {
			d: `${mixPath(transition.value, previousPath, currentPath)}L ${width} ${height} L 0 ${height}`
		};
	});

	return (
		<View style={styles.container}>
			<Svg>
				<Defs>
					<LinearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
						<Stop offset="0%" stopColor="#b36de6" />
						<Stop offset="15%" stopColor="#cda8e7" />
						<Stop offset="100%" stopColor="#feffff" />
					</LinearGradient>
				</Defs>
				<AnimatedPath animatedProps={animatedPropsBg} fill="url(#gradient)" />
				<AnimatedPath fill="transparent" stroke="#6a0dad" animatedProps={animatedPropsLine} strokeWidth={2} />
			</Svg>
			<Cursor translation={translation} index={current} />
		</View>
	);
};

export default Chart;
