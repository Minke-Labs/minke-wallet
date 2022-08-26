/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Text, View, Touchable, AnimatedView } from '@components';
import { useLanguage } from '@hooks';
import { screenWidth } from '@styles';
import { GraphIndex } from '../Chart.types';
import { SelectorProps } from './Selector.types';

const SELECTOR_HEIGHT = 32;

const Selector: React.FC<SelectorProps> = ({ previous, current, transition, graphs }) => {
	const { i18n } = useLanguage();
	const BUTTON_WIDTH = screenWidth / graphs.length;

	const [using, setUsing] = useState(0);

	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(BUTTON_WIDTH * (current.value + 0.11)) }]
	}));

	return (
		<View mb="s">
			<AnimatedView
				bgc="cta1"
				w={52}
				h={SELECTOR_HEIGHT}
				br="xs"
				style={[animatedBackgroundTag, { ...StyleSheet.absoluteFillObject }]}
			/>

			<FlatList
				keyExtractor={(item) => item.label}
				data={graphs}
				renderItem={({ item, index }) => (
					<Touchable
						opacity={1}
						key={item.label}
						onPress={() => {
							previous.value = current.value;
							transition.value = 0;
							current.value = index as GraphIndex;
							transition.value = withTiming(1);
							setUsing(item.value);
						}}
					>
						<AnimatedView
							h={SELECTOR_HEIGHT}
							w={BUTTON_WIDTH}
							main="center"
							cross="center"
						>
							<Text
								type="lLarge"
								color={item.value === using ? 'cta3' : 'cta4'}
								weight="semiBold"
							>
								{i18n.t(`AssetsScreen.Upper.Chart.Selection.Chart.${item.label}`)}
							</Text>
						</AnimatedView>
					</Touchable>
				)}
				horizontal
			/>
		</View>
	);
};

export default Selector;
