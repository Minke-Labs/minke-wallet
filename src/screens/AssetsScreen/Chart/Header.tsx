import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	interpolate,
	useDerivedValue
	// useAnimatedStyle
} from 'react-native-reanimated';
import { Vector, round } from 'react-native-redash';
import {
	// Icon,
	AnimatedText
} from '@components';
// import { useTheme } from '@hooks';
import {
	// graphs,
	width
} from './Graph.utils';
import { GraphIndex } from './Graph.types';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between'
	}
});

interface HeaderProps {
	translation: Vector<Animated.SharedValue<number>>;
	index: Animated.SharedValue<GraphIndex>;
	// percChange: number;
	graphs: any;
}

const Header: React.FC<HeaderProps> = ({
	translation,
	index,
	graphs
	// percChange
}) => {
	// const { colors } = useTheme();
	const data = useDerivedValue(() => graphs[index.value].data);
	const price = useDerivedValue(() => {
		const p = interpolate(translation.y.value, [0, width], [data.value.maxPrice, data.value.minPrice]);
		return `$ ${round(p, 2).toLocaleString('en-US', { currency: 'USD' })}`;
	});
	// const animatedText = useDerivedValue(() => `${round(data.value.percentChange, 3)}%`);
	// const animatedTextStyle = useAnimatedStyle(() => ({
	// color: data.value.percentChange > 0 ? colors.alert3 : colors.alert1
	// }));
	return (
		<View style={styles.container}>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<AnimatedText
					marginBottom={2}
					text={price}
					weight="extraBold"
					style={{ fontSize: 28, lineHeight: 34 }}
				/>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}
				>
					{/* <Icon
						name={percChange > 0 ? 'iconUp' : 'iconDown'}
						color={percChange > 0 ? 'alert3' : 'alert1'}
						size={16}
						style={{ marginRight: 4 }}
					/>
					<AnimatedText text={animatedText} style={animatedTextStyle} type="a" /> */}
				</View>
			</View>
		</View>
	);
};

export default Header;
