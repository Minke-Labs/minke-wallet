import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import { Icon, Text, Token } from '@components';
import { styles } from './ListItem.styles';
import { ListItemProps } from './ListItem.types';

const ListItem: React.FC<ListItemProps> = ({ label, selected, onPress, token, testnet }) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.container, { borderBottomColor: colors.background2 }]}
			disabled={selected}
		>
			<View style={styles.leftContainer}>
				<Token outline={selected} token={token} size={32} />
				<Text style={{ marginLeft: 8 }} weight={selected ? 'bold' : 'medium'}>
					{label}
				</Text>
			</View>

			{testnet && (
				<View style={[styles.tag, { backgroundColor: colors.background2 }]}>
					<Text color="text2" style={{ fontSize: 12 }}>
						{i18n.t('ChangeNetworkScreen.ListItem.test_network')}
					</Text>
				</View>
			)}

			<View style={{ width: 24 }}>{selected && <Icon name="checkColor" size={24} />}</View>
		</TouchableOpacity>
	);
};

export default ListItem;
