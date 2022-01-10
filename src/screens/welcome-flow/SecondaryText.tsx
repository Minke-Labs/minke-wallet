import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
		lineHeight: 21.78,
		textAlign: 'center',
		fontFamily: 'Inter_500Medium',
		marginBottom: 40
	}
});

export default function SecondaryText({ children }: any) {
	const { colors } = useTheme();
	return <Text style={[styles.text, { color: colors.secondaryText }]}>{children}</Text>;
}
