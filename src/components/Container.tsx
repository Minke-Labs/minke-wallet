/* eslint-disable react/style-prop-object */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';

const selfStyles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default function Container({ children, style }: any) {
	const { colors } = useTheme();
	return (
		<View style={[style || selfStyles.container, { backgroundColor: colors.background }]}>
			{children}
			<StatusBar style="auto" />
		</View>
	);
}