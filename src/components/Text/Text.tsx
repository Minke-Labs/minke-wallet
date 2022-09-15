import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@hooks';
import { makeStyles } from './Text.styles';
import { TextComponentProps } from './Text.types';

const TextComponent: React.FC<Partial<TextComponentProps>> = ({
	children,
	weight = 'regular',
	type = 'bMedium',
	color = 'text1',
	marginBottom = 0,
	width = 0,
	center = false,
	numberOfLines,
	mb = 'zero',
	style
}) => {
	const { colors } = useTheme();
	const chosenColor = colors[color];
	const styles = makeStyles({ weight, type, chosenColor, marginBottom, width, center, mb, style });
	return (
		<Text style={styles.text} numberOfLines={numberOfLines}>
			{children}
		</Text>
	);
};

export default TextComponent;
