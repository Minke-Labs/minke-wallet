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
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 16
	}
});

interface ListItemProps {
	onPress: (event: GestureResponderEvent) => void;
	label: string;
	backedUp: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ label, backedUp, onPress }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity onPress={onPress} style={[styles.container, { borderBottomColor: colors.background2 }]}>
			<View style={[styles.leftContainer, { opacity: backedUp ? 0.5 : 1 }]}>
				<Image source={{ uri: makeBlockie(label) }} style={styles.avatar} />
				<Text type="a" style={{ marginLeft: 8, fontSize: 12 }} weight={backedUp ? 'bold' : 'medium'}>
					{label}
				</Text>
			</View>

			<View style={{ width: 30 }}>
				{backedUp ? (
					<View style={{ alignItems: 'center' }}>
						<Icon name="cloudStroke" size={24} color="alert3" />
						<Text type="span" weight="regular" width={30}>
							Done
						</Text>
					</View>
				) : (
					<Icon name="backupStroke" size={24} color="detail2" />
				)}
			</View>
		</TouchableOpacity>
	);
};

export default ListItem;
