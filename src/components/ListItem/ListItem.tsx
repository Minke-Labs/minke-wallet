import React from 'react';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import ItemTag from '../ItemTag/ItemTag';
import View from '../View/View';
import Touchable from '../Touchable/Touchable';
import { ListItemProps } from './ListItem.types';

const ListItem: React.FC<ListItemProps> = ({
	title,
	desc,
	iconName = 'arrowRight',
	tagType = 'icon',
	tagColor = 'background2',
	SvgComponent,
	onPress
}) => (
	<Touchable
		row
		main="space-between"
		cross="center"
		mb="s"
		onPress={onPress}
	>
		<View row>
			<ItemTag
				tagType={tagType}
				tagColor={tagColor}
				iconName={iconName}
				SvgComponent={SvgComponent}
			/>
			<View ml="xs">
				<Text type="bSmall" weight="semiBold">
					{title}
				</Text>
				<Text type="bSmall">
					{desc}
				</Text>
			</View>
		</View>
		<Icon color="cta1" size={24} name="chevronRight" />
	</Touchable>
);

export default ListItem;
