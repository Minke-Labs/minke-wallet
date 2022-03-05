import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@components';
import styles from './styles';
import { ItemProps } from './types';

const Item: React.FC<ItemProps> = ({ firstLine, secondLine, imageSource, onSelected }) => (
	<TouchableOpacity style={styles.itemContainer} onPress={onSelected}>
		{imageSource && <Image source={imageSource} style={styles.avatar} />}
		<View style={styles.contactTitleContainer}>
			<Text type="p2" weight="bold">
				{firstLine}
			</Text>
			<Text type="span" color="text4">
				{secondLine}
			</Text>
		</View>
		<Icon size={24} name="arrowForwardStroke" color="text7" />
	</TouchableOpacity>
);

export default Item;
