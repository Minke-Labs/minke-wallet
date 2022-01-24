import React from 'react';
import { StyleSheet, StyleProp, TextStyle, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import TextButton from './TextButton';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		container: {
			borderRadius: 16,
			paddingLeft: 16,
			paddingRight: 16,
			alignItems: 'center',
			backgroundColor: colors.fill
		}
	});

const RoundButton = ({
	text,
	icon,
	containerStyle = {},
	onPress
}: {
	text: string;
	icon?: string;
	containerStyle?: StyleProp<TextStyle>;
	onPress?: ((event: GestureResponderEvent) => void) | undefined;
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<TextButton text={text} icon={icon} containerStyle={containerStyle} />
		</TouchableOpacity>
	);
};

export default RoundButton;
