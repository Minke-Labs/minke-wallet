import React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Text, Icon } from '@components';
import { styles } from './TransactionContacts.styles';

interface ItemProps {
	firstLine: string;
	secondLine: string | JSX.Element;
	imageSource?: ImageSourcePropType;
	onSelected: () => void;
}

const Item: React.FC<ItemProps> = ({ firstLine, secondLine, imageSource, onSelected }) => (
	<TouchableOpacity style={styles.itemContainer} onPress={onSelected}>
		{imageSource && <Image source={imageSource} style={styles.avatar} />}
		<View style={styles.contactTitleContainer}>
			<Text type="p2" weight="bold">{firstLine}</Text>
			<Text type="span" color="text4">{secondLine}</Text>
		</View>
		<Icon size={24} name="arrowForwardStroke" color="text7" />
	</TouchableOpacity>
);

export default Item;
