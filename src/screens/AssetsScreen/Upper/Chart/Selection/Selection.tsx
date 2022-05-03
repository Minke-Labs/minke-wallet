/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { View, Dimensions, TouchableWithoutFeedback, FlatList } from 'react-native';
import { Text } from '@components';
// import { graphs } from './Graph.utils';
import { useLanguage } from '@hooks';
import { GraphIndex } from '../Chart.types';
import { SelectionProps } from './Selection.types';
import { styles } from './Selection.styles';

const { width } = Dimensions.get('window');

const Selection: React.FC<SelectionProps> = ({ previous, current, transition, graphs }) => {
	const { i18n } = useLanguage();
	const BUTTON_WIDTH = width / graphs.length;

	const [using, setUsing] = useState(0);

	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(BUTTON_WIDTH * (current.value + 0.11)) }]
	}));
	return (
		<View style={styles.container}>
			<Animated.View style={[styles.backgroundTag, animatedBackgroundTag]} />

			<FlatList
				keyExtractor={(item) => item.label}
				data={graphs}
				renderItem={({ item, index }) => (
					<TouchableWithoutFeedback
						key={item.label}
						onPress={() => {
							previous.value = current.value;
							transition.value = 0;
							current.value = index as GraphIndex;
							transition.value = withTiming(1);
							setUsing(item.value);
						}}
					>
						<Animated.View style={[styles.labelContainer, { width: BUTTON_WIDTH }]}>
							<Text
								color={item.value === using ? 'text6' : 'text9'}
								weight={item.value === using ? 'bold' : 'regular'}
							>
								{i18n.t(`AssetsScreen.Upper.Chart.Selection.Chart.${item.label}`)}
							</Text>
						</Animated.View>
					</TouchableWithoutFeedback>
				)}
				horizontal
			/>
		</View>
	);
};

export default Selection;
