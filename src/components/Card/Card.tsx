import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Text from '../Text/Text';
import { CardProps } from './Card.types';
import { styles } from './styles';

const Card: React.FC<CardProps> = ({
	title,
	subtitle,
	image,
	right,
	style,
	onPress,
	marginBottom = 32,
	titleStyle,
	subtitleStyle,
	thirdRowText,
	thirdRowStyle
}) => (
	<TouchableOpacity activeOpacity={0.6} style={[styles.container, { marginBottom }]} {...{ onPress }}>
		<View style={[styles.leftContainer, { ...(style as object) }]}>
			{image}
			<View style={styles.titleContainer}>
				<Text color="text1" weight="semiBold" style={{ fontSize: 12, ...(titleStyle as object) }}>
					{title}
				</Text>
				<Text color="text4" style={{ fontSize: 16, ...(subtitleStyle as object) }} weight="medium">
					{subtitle}
				</Text>
				{thirdRowText && (
					<Text color="text2" style={{ fontSize: 16, ...(thirdRowStyle as object) }} weight="medium">
						{thirdRowText}
					</Text>
				)}
			</View>
		</View>
		{right}
	</TouchableOpacity>
);

export default Card;
