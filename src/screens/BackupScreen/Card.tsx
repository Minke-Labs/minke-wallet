import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text } from '@components';
import { useTheme } from '@hooks';

const styles = StyleSheet.create({
	container: {
		height: 40,
		marginBottom: 16,
		flexDirection: 'row',
		width: '50%',
		alignItems: 'center'
	},
	tag: {
		height: 40,
		width: 40,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12
	}
});

interface CardProps {
	title: string;
	idx: number;
}

const Card: React.FC<CardProps> = ({ title, idx }) => {
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<View style={[styles.tag, { backgroundColor: colors.background4 }]}>
				<Text weight="medium" type="p" color="text7">
					{idx + 1}
				</Text>
			</View>
			<Text>{title}</Text>
		</View>
	);
};

export default Card;
