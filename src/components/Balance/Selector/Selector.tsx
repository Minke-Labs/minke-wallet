import React from 'react';
import { TouchableOpacity } from 'react-native';
import AnimatedView from '@src/components/AnimatedView/AnimatedView';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const BUTTON_WIDTH = 46;

interface SelectorProps {
	active: boolean;
	setActive: (active: boolean) => void;
	coinSymbol?: string;
}

const Selector: React.FC<SelectorProps> = ({ active, setActive, coinSymbol }) => {
	const animatedBackgroundTag = useAnimatedStyle(() => ({
		transform: [{ translateX: withTiming(active ? BUTTON_WIDTH : 4) }]
	}));

	return (
		<TouchableOpacity activeOpacity={1} onPress={() => setActive(!active)}>
			<View
				w={96}
				h={20}
				br="m"
				row
				cross="center"
				bgc="background1"
			>
				<AnimatedView
					w={BUTTON_WIDTH}
					h={16}
					br="xs"
					bgc="cta1"
					style={[{ position: 'absolute' }, animatedBackgroundTag]}
				/>
				<View main="center" cross="center" style={{ flex: 1 }}>
					<Text
						weight={active ? 'bold' : 'medium'}
						type="lSmall"
						color={active ? 'text3' : 'text6'}
					>
						USD
					</Text>
				</View>
				<View main="center" cross="center" style={{ flex: 1 }}>
					<Text
						weight={active ? 'bold' : 'medium'}
						type="lSmall"
						color={active ? 'text6' : 'text3'}
					>
						{coinSymbol}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default Selector;
