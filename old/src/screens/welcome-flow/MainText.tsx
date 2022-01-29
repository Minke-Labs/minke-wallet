import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
	mainText: {
		fontSize: 36,
		lineHeight: 43,
		fontFamily: 'Inter_800ExtraBold',
		textAlign: 'center',
		marginBottom: 16
	}
});

export default function MainText({ children }: any) {
	const { colors } = useTheme();
	return <Text style={[styles.mainText, { color: colors.text }]}>{children}</Text>;
}
