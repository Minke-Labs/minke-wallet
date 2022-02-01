import React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Text } from 'react-native-paper';
import Arrow from '../Arrow';
import { styles } from './TransactionContacts.styles';

interface ItemProps {
	firstLine: string;
	secondLine: string | JSX.Element;
	imageSource: ImageSourcePropType;
	onSelected: () => void;
}

const Item: React.FC<ItemProps> = ({ firstLine, secondLine, imageSource, onSelected }) => (
	<TouchableOpacity style={styles.itemContainer} onPress={onSelected}>
		{imageSource ? <Image source={imageSource} style={styles.avatar} /> : null}
		<View style={styles.contactTitleContainer}>
			<Text style={styles.contactTitle}>{firstLine}</Text>
			<Text>{secondLine}</Text>
		</View>
		<Arrow />
	</TouchableOpacity>
);

export default Item;
