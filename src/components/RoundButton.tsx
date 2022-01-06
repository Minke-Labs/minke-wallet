import React from 'react';
import { StyleSheet, StyleProp, TextStyle, View, useColorScheme } from 'react-native';
import TextButton from './TextButton';

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		paddingLeft: 16,
		paddingRight: 16,
		marginRight: 16
	}
});

const RoundButton = ({
	text,
	icon,
	containerStyle = {}
}: {
	text: string;
	icon: string;
	// eslint-disable-next-line react/require-default-props
	containerStyle?: StyleProp<TextStyle>;
}) => {
	const scheme = useColorScheme();
	return (
		<View
			style={[styles.container, { backgroundColor: scheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : '#FFFFFF' }]}
		>
			<TextButton text={text} icon={icon} containerStyle={containerStyle} />
		</View>
	);
};

export default RoundButton;
