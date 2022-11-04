import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Icon, Text, Token } from '@components';
import { styles } from './ListItem.styles';
import { ListItemProps } from './ListItem.types';

const ListItem: React.FC<ListItemProps> = ({ label, selected, onPress, token }) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.container, { borderBottomColor: colors.background2 }]}
			disabled={selected}
		>
			<View style={styles.leftContainer}>
				<Token outline={selected} token={{ symbol: token || '', address: '', decimals: 0 }} size={32} />
				<Text type="a" style={{ marginLeft: 8, fontSize: 12 }} weight={selected ? 'bold' : 'medium'}>
					{label}
				</Text>
			</View>

			<View style={{ width: 24 }}>{selected && <Icon name="checkColor" size={24} />}</View>
		</TouchableOpacity>
	);
};

export default ListItem;
