import React from 'react';
import { TextInput } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { useTheme } from '@hooks';
import { TextComponentProps } from './Text.types';
import { makeStyles } from './Text.styles';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const AnimatedText: React.FC<TextComponentProps> = ({
	style,
	text,
	color = 'text1',
	weight = 'regular',
	type = 'p',
	marginBottom = 0,
	width = 0,
	center = false
}) => {
	const { colors } = useTheme();
	const chosenColor = colors[color];
	const animatedProps = useAnimatedProps(() => ({ text: text.value } as any));
	const styles = makeStyles({ weight, type, chosenColor, marginBottom, width, center });
	return (
		<AnimatedTextInput
			underlineColorAndroid="transparent"
			editable={false}
			value={text.value}
			// multiline
			style={[styles.text, style]}
			{...{ animatedProps }}
		/>
	);
};

export default AnimatedText;
