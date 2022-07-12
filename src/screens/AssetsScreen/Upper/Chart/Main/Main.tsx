import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { mixPath } from 'react-native-redash';
import { screenWidth } from '@styles';
import { height } from '../Chart.utils';
import Cursor from './Cursor/Cursor';
import { styles } from './Main.styles';
import { ChartProps } from './Main.types';
import { ChartAreaGradients } from './ChartAreaGradients/ChartAreaGradients';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Chart: React.FC<ChartProps> = ({ color, previous, current, transition, translation, graphs }) => {
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
			d: `${mixPath(transition.value, previousPath, currentPath)}L ${screenWidth} ${height}L 0 ${height}`
		};
	});

	return (
		<View style={styles.container}>
			<Svg>
				<ChartAreaGradients {...{ color }} />
				<AnimatedPath animatedProps={animatedPropsBg} fill="url(#gradient1)" />
				<AnimatedPath fill="transparent" stroke={color} animatedProps={animatedPropsLine} strokeWidth={2} />
			</Svg>
			<Cursor index={current} {...{ color, translation, graphs }} />
		</View>
	);
};

export default Chart;
