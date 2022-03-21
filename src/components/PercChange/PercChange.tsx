/* eslint-disable no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import { useDerivedValue, useAnimatedStyle } from 'react-native-reanimated';
import { round } from 'react-native-redash';
import { useTheme } from '@hooks';
import Icon from '../Icon/Icon';
import AnimatedText from '../AnimatedText/AnimatedText';
import styles from './PercChange.styles';
import { PercChangeProps } from './PercChange.types';

const PercChange: React.FC<PercChangeProps> = ({ percZero, percChange, data }) => {
	const { colors } = useTheme();

	const animatedText = useDerivedValue(() => `${round(data.value.percentChange, 3)}%`);
	const animatedTextStyle = useAnimatedStyle(() => ({
		color:
			data.value.percentChange > 0 ? colors.alert3 : data.value.percentChange < 0 ? colors.alert1 : colors.text4
	}));

	return (
		<View style={styles.container}>
			{!percZero && (
				<Icon
					name={percChange ? 'iconUp' : 'iconDown'}
					color={data.value.percentChange > 0 ? 'alert3' : data.value.percentChange < 0 ? 'alert1' : 'text4'}
					size={16}
					style={{ marginRight: 4 }}
				/>
			)}
			<AnimatedText text={animatedText} style={animatedTextStyle} type="a" />
		</View>
	);
};

export default PercChange;
