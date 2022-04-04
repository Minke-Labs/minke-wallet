import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@hooks';
import { Icon, Text } from '@components';
import makeBlockie from 'ethereum-blockies-base64';
import { styles } from './ListItem.styles';
import { ListItemProps } from './ListItem.types';

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
