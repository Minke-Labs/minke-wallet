import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
	listItem: {
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderBottomColor: '#FFFFFF',
		marginBottom: 10,
		paddingBottom: 15
	},
	itemLabel: {
		fontSize: 16,
		fontWeight: '700',
		fontFamily: 'Inter_500Medium' // @Avelar: its 700 normal on Figma but our 700 is bold
	}
});

const ListItem = ({
	label,
	selected,
	onPress
}: {
	onPress: (event: GestureResponderEvent) => void;
	selected: boolean;
	label: string;
}) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity onPress={onPress} style={styles.listItem} disabled={selected}>
			<Text style={styles.itemLabel}>{label}</Text>
			{selected ? <MaterialIcons name="check" size={20} color={colors.text} /> : null}
		</TouchableOpacity>
	);
};

export default ListItem;
