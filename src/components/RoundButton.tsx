import React from 'react';
import { StyleSheet, StyleProp, TextStyle, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import TextButton from './TextButton';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			borderRadius: 16,
			paddingLeft: 16,
			paddingRight: 16,
			marginRight: 16,
			backgroundColor: colors.fill
		}
	});

const RoundButton = ({
	text,
	icon,
	containerStyle = {}
}: {
	text: string;
	icon: string;
	containerStyle?: StyleProp<TextStyle>;
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.container}>
			<TextButton text={text} icon={icon} containerStyle={containerStyle} />
		</View>
	);
};

export default RoundButton;
