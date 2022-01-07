import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
	cardActionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 16,
		paddingBottom: 16
	},
	cardButtonIcon: {
		paddingRight: 8
	}
});

const TextButton = ({
	text,
	icon,
	containerStyle = {}
}: {
	text: string;
	icon: string;
	containerStyle?: StyleProp<TextStyle>;
}) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity style={[containerStyle, styles.cardActionButton]}>
			<MaterialIcons name={icon} size={20} color={colors.primary} style={styles.cardButtonIcon} />
			<Text>{text}</Text>
		</TouchableOpacity>
	);
};

export default TextButton;
