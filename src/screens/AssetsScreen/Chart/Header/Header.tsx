import React from 'react';
import { View } from 'react-native';
import { interpolate, useDerivedValue, useAnimatedStyle } from 'react-native-reanimated';
import { round } from 'react-native-redash';
import { Icon, AnimatedText } from '@components';
import { useTheme } from '@hooks';
import { width } from '../Chart.utils';
import styles from './Header.styles';
import { HeaderProps } from './Header.types';

const Header: React.FC<HeaderProps> = ({ translation, index, graphs, percChange }) => {
	const { colors } = useTheme();
	const data = useDerivedValue(() => graphs[index.value].data);
	const price = useDerivedValue(() => {
		const p = interpolate(translation.y.value, [0, width], [data.value.maxPrice, data.value.minPrice]);
		return `$ ${round(p, 2).toLocaleString('en-US', { currency: 'USD' })}`;
	});
	const animatedText = useDerivedValue(() => `${round(data.value.percentChange, 3)}%`);
	const animatedTextStyle = useAnimatedStyle(() => ({
		color: data.value.percentChange > 0 ? colors.alert3 : colors.alert1
	}));
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<AnimatedText
					marginBottom={2}
					text={price}
					weight="extraBold"
					style={{ fontSize: 28, lineHeight: 34 }}
				/>
				<View style={styles.indicatorContainer}>
					<Icon
						name={percChange > 0 ? 'iconUp' : 'iconDown'}
						color={percChange > 0 ? 'alert3' : 'alert1'}
						size={16}
						style={{ marginRight: 4 }}
					/>
					<AnimatedText text={animatedText} style={animatedTextStyle} type="a" />
				</View>
			</View>
		</View>
	);
};

export default Header;
