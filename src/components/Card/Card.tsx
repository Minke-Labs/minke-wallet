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
	subtitleStyle
}) => (
	<TouchableOpacity activeOpacity={0.6} style={[styles.container, { marginBottom }]} {...{ onPress }}>
		<View style={[styles.leftContainer, { ...(style as object) }]}>
			{image}
			<View style={styles.titleContainer}>
				<Text style={{ fontSize: 12, ...(titleStyle as object) }}>{title}</Text>
				<Text style={{ fontSize: 16, ...(subtitleStyle as object) }} weight="medium">
					{subtitle}
				</Text>
			</View>
		</View>
		{right}
	</TouchableOpacity>
);

export default Card;
