import React from 'react';
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import { Text } from '@components';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 32
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	titleContainer: {
		marginLeft: 12
	}
});

interface CardProps {
	title: string;
	subtitle: string;
	image: React.ReactChild;
	right?: React.ReactChild;
	style?: StyleProp<ViewStyle>;
	onPress?: (event: GestureResponderEvent) => void;
}

const Card: React.FC<CardProps> = ({ title, subtitle, image, right, style, onPress }) => (
	<TouchableOpacity activeOpacity={0.6} style={styles.container} {...{ onPress }}>
		<View style={[styles.leftContainer, { ...(style as object) }]}>
			{image}
			<View style={styles.titleContainer}>
				<Text style={{ fontSize: 12 }}>{title}</Text>
				<Text style={{ fontSize: 16 }} weight="medium">
					{subtitle}
				</Text>
			</View>
		</View>
		{right}
	</TouchableOpacity>
);

export default Card;
