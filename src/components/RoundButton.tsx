import React from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Card } from 'react-native-paper';
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
}) => (
	<Card style={styles.container}>
		<TextButton text={text} icon={icon} containerStyle={containerStyle} />
	</Card>
);

export default RoundButton;
