import React from 'react';
import { View } from 'react-native';
import { useDerivedValue, useAnimatedStyle } from 'react-native-reanimated';
import { round } from 'react-native-redash';
import { Icon, AnimatedText } from '@components';
import { useTheme } from '@hooks';
import styles from './PercChange.styles';
import { PercChangeProps } from './PercChange.types';

const PercChange: React.FC<PercChangeProps> = ({ percChange, data }) => {
	const { colors } = useTheme();
	const animatedText = useDerivedValue(() => `${round(data.value.percentChange, 3)}%`);
	const animatedTextStyle = useAnimatedStyle(() => ({
		color: data.value.percentChange > 0 ? colors.alert3 : colors.alert1
	}));

	return (
		<View style={styles.container}>
			<Icon
				name={percChange ? 'iconUp' : 'iconDown'}
				color={percChange ? 'alert3' : 'alert1'}
				size={16}
				style={{ marginRight: 4 }}
			/>
			<AnimatedText text={animatedText} style={animatedTextStyle} type="a" />
		</View>
	);
};

export default PercChange;
