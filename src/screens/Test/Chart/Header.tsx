import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { Vector, round } from 'react-native-redash';
import { Text, Token, Icon, AnimatedText } from '@components';
import { useTheme } from '@hooks';
import { graphs, width } from './Graph.utils';
import { GraphIndex } from './Graph.types';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		paddingHorizontal: 24,
		backgroundColor: '#fff'
	},
	upperContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 32
	}
});

interface HeaderProps {
	translation: Vector<Animated.SharedValue<number>>;
	index: Animated.SharedValue<GraphIndex>;
}

const Header = ({ translation, index }: HeaderProps) => {
	const { colors } = useTheme();
	const data = useDerivedValue(() => graphs[index.value].data);
	const price = useDerivedValue(() => {
		const p = interpolate(translation.y.value, [0, width], [data.value.maxPrice, data.value.minPrice]);
		return `$ ${round(p, 2).toLocaleString('en-US', { currency: 'USD' })}`;
	});
	const percentChange = useDerivedValue(() => `${round(data.value.percentChange, 3)}%`);
	// const label = useDerivedValue(() => data.value.label);
	const animatedTextStyle = useAnimatedStyle(() => ({
		color: data.value.percentChange > 0 ? colors.alert3 : colors.alert1
	}));
	return (
		<View style={styles.container}>
			<View style={styles.upperContainer}>
				<TouchableOpacity style={{ marginRight: 24 }}>
					<Icon name="arrowBackStroke" size={24} color="text7" />
				</TouchableOpacity>
				<Token name="eth" size={40} />
				<View style={{ marginLeft: 8 }}>
					<Text weight="extraBold" style={{ fontSize: 18 }}>
						Etherum
					</Text>
					<Text>$ETH</Text>
				</View>
			</View>

			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<AnimatedText marginBottom={2} text={price} weight="extraBold" style={{ fontSize: 28 }} />
				<AnimatedText text={percentChange} style={animatedTextStyle} type="a" />
			</View>
		</View>
	);
};

export default Header;
