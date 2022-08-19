import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@hooks';
import { Icon, Text } from '@components';
import makeBlockie from 'ethereum-blockies-base64';
import { styles } from './ListItem.styles';
import { ListItemProps } from './ListItem.types';

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
						<Icon name="cloud" size={24} color="alert3" />
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
