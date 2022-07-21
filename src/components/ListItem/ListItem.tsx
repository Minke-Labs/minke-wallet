import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import ItemTag from '../ItemTag/ItemTag';
import { ListItemProps } from './ListItem.types';
import styles from './ListItem.styles';

const ListItem: React.FC<ListItemProps> = ({
	title,
	desc,
	iconName = 'arrowRight',
	tagType = 'icon',
	tagColor = 'background2',
	SvgComponent,
	onPress
}) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			style={[styles.container, { borderBottomColor: colors.detail3 }]}
			onPress={onPress}
		>
			<View style={{ flexDirection: 'row' }}>
				<ItemTag
					tagType={tagType}
					tagColor={tagColor}
					iconName={iconName}
					SvgComponent={SvgComponent}
				/>
				<View style={{ marginLeft: 12 }}>
					<Text type="bSmall" weight="semiBold">
						{title}
					</Text>
					<Text type="bSmall">
						{desc}
					</Text>
				</View>
			</View>
			<Icon color="cta1" size={24} name="chevronRight" />
		</TouchableOpacity>
	);
};

export default ListItem;
