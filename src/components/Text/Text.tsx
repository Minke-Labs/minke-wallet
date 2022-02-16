import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@hooks';
import { makeStyles } from './Text.styles';
import { TextComponentProps } from './Text.types';

const TextComponent: React.FC<Partial<TextComponentProps>> = ({
	children,
	weight = 'regular',
	type = 'p',
	color = 'text1',
	marginBottom = 0,
	width = 0,
	center = false,
	style
}) => {
	const { colors } = useTheme();
	const chosenColor = colors[color];
	const styles = makeStyles({ weight, type, chosenColor, marginBottom, width, center, style });
	return <Text style={styles.text}>{children}</Text>;
};

export default TextComponent;
