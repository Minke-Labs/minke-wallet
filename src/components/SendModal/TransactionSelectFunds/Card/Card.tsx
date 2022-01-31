import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Arrow from '../../Arrow';
import { styles } from './Card.styles';

interface CardProps {
	name: string;
	image: any;
	user: UserProps;
	onSelected: (name: string) => void
}

interface UserProps {
	name: string;
	address: string;
}

const Card: React.FC<CardProps> = ({ name, image, user, onSelected }) => (
	<TouchableOpacity
		style={styles.container}
		activeOpacity={0.6}
		onPress={() => onSelected(name)}
	>
		<Image
			style={styles.image}
			source={image}
		/>
		<View style={{ flex: 1 }}>
			<Text style={styles.title}>{name}</Text>
			<Text style={styles.subtitle}>
				$200 (0.045 ETH)
				<Text style={styles.available}>{' '}Available</Text>
			</Text>
		</View>
		<Arrow />
	</TouchableOpacity>
);

export default Card;
