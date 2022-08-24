import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { styles } from './Selector.styles';
import { BUTTON_WIDTH } from './Selector.utils';
import { SelectorProps } from './Selector.types';

const Selector: React.FC<SelectorProps> = ({ active, setActive, coinSymbol }) => {
	const { colors } = useTheme();

	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(active ? BUTTON_WIDTH : 4) }]
	}));

	return (
		<TouchableOpacity
			activeOpacity={1}
			onPress={() => setActive(!active)}
			style={[styles.container, { backgroundColor: colors.background1 }]}
		>
			<Animated.View style={[styles.backgroundTag, animatedBackgroundTag]} />

			<View style={styles.titleContainer}>
				<Text weight={active ? 'bold' : 'medium'} style={{ fontSize: 12 }} color={active ? 'text3' : 'text6'}>
					USD
				</Text>
			</View>

			<View style={styles.titleContainer}>
				<Text
					weight={active ? 'bold' : 'medium'}
					style={{ fontSize: 12 }}
					color={active ? 'text6' : 'text3'}
				>
					{coinSymbol}
				</Text>
			</View>

		</TouchableOpacity>
	);
};

export default Selector;
