import React from 'react';
import { useTheme } from '@hooks';
import { View, useColorScheme } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { mixPath } from 'react-native-redash';
import { width, height } from '../Chart.utils';
import Cursor from './Cursor/Cursor';
import { styles } from './Main.styles';
import { ChartProps } from './Main.types';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Chart: React.FC<ChartProps> = ({ previous, current, transition, translation, percChange, graphs }) => {
	const scheme = useColorScheme();
	const { colors } = useTheme();

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
			d: `${mixPath(transition.value, previousPath, currentPath)}L ${width} ${height}L 0 ${height}`
		};
	});

	return (
		<View style={styles.container}>
			<Svg>
				<Defs>
					<LinearGradient id="gradient1" x1="50%" y1="0%" x2="50%" y2="100%">
						<Stop
							offset="0%"
							stopColor={percChange > 0 ? colors.graphic1 : colors.graphicRed1}
							stopOpacity={scheme === 'dark' ? 0.4 : 0.6}
						/>
						<Stop
							offset="15%"
							stopColor={percChange > 0 ? colors.graphic2 : colors.graphicRed2}
							stopOpacity={scheme === 'dark' ? 0.2 : 0.6}
						/>
						<Stop
							offset="100%"
							stopColor={percChange > 0 ? colors.graphic3 : colors.graphicRed3}
							stopOpacity={0}
						/>
					</LinearGradient>
				</Defs>
				<AnimatedPath animatedProps={animatedPropsBg} fill="url(#gradient1)" />
				<AnimatedPath
					fill="transparent"
					stroke={percChange > 0 ? colors.alert3 : colors.alert1}
					animatedProps={animatedPropsLine}
					strokeWidth={2}
				/>
			</Svg>
			<Cursor index={current} {...{ percChange, translation }} {...{ graphs }} />
		</View>
	);
};

export default Chart;
