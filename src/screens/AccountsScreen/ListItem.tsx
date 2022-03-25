import React from 'react';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent, Image } from 'react-native';
import { useTheme } from '@hooks';
import { Icon, Text } from '@components';
import makeBlockie from 'ethereum-blockies-base64';

const styles = StyleSheet.create({
	container: {
		height: 64,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderStyle: 'solid'
	},
	leftContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '70%'
	},
	tag: {
		paddingHorizontal: 8,
		borderRadius: 14
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16
	}
});

interface ListItemProps {
	onPress: (event: GestureResponderEvent) => void;
	label: string;
	selected: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ label, selected, onPress }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.container, { borderBottomColor: colors.background2 }]}
			disabled={selected}
		>
			<View style={styles.leftContainer}>
				<Image source={{ uri: makeBlockie(label) }} style={styles.image} />
				<Text type="a" style={{ marginLeft: 8, fontSize: 12 }} weight={selected ? 'bold' : 'medium'}>
					{label}
				</Text>
			</View>

			<View style={{ width: 24 }}>{selected && <Icon name="checkColor" size={24} />}</View>
		</TouchableOpacity>
	);
};

export default ListItem;
