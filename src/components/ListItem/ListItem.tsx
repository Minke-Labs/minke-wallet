import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon, ItemTag } from '@components';
import { useTheme } from '@hooks';
import { ListItemProps } from './ListItem.types';
import styles from './ListItem.styles';

const ListItem: React.FC<ListItemProps> = ({
	title,
	desc,
	iconName = 'arrowRight',
	tagType = 'icon',
	tagColor = 'background2',
	SvgComponent
}) => {
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			style={[styles.container, { borderBottomColor: colors.detail3 }]}
			onPress={() => null}
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
