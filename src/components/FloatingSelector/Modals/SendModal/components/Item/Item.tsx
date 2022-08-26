import React from 'react';
import { View, Image } from 'react-native';
import Icon from '@src/components/Icon/Icon';
import Text from '@src/components/Text/Text';
import Touchable from '@src/components/Touchable/Touchable';
import styles from './Item.styles';
import { ItemProps } from './Item.types';

const Item: React.FC<ItemProps> = ({ firstLine, secondLine, imageSource, onSelected }) => (
	<Touchable style={styles.itemContainer} onPress={onSelected}>
		<Image source={imageSource!} style={styles.avatar} />
		<View style={styles.contactTitleContainer}>
			<Text type="p2" weight="bold">
				{firstLine}
			</Text>
			<Text type="span" color="text4">
				{secondLine}
			</Text>
		</View>
		<Icon size={24} name="arrowForwardStroke" color="text7" />
	</Touchable>
);

export default Item;
