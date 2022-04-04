import { View } from 'react-native';
import React from 'react';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { styles } from './Card.styles';
import { CardProps } from './Card.types';

const Card: React.FC<CardProps> = ({ title, idx }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<View style={[styles.tag, { backgroundColor: colors.background4 }]}>
				<Text weight="medium" type="p" color="text7">
					{idx}
				</Text>
			</View>
			<Text>{title}</Text>
		</View>
	);
};

export default Card;
