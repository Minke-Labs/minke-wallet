import { WalletToken } from '@src/model/wallet';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Arrow from '../../Arrow';
import { styles } from './Card.styles';

interface CardProps {
	token: WalletToken;
	user: UserProps;
	onSelected: (name: string) => void;
}

interface UserProps {
	name: string;
	address: string;
}

const Card: React.FC<CardProps> = ({ token, user, onSelected }) => (
	<TouchableOpacity style={styles.container} activeOpacity={0.6} onPress={() => onSelected(token.symbol)}>
		<Image style={styles.image} source={require('@assets/eth.png')} />
		<View style={{ flex: 1 }}>
			<Text style={styles.title}>{token.symbol}</Text>
			<Text style={styles.subtitle}>
				${token.balanceUSD.toString().match(/^-?\d+(?:\.\d{0,2})?/)} ({token.balance} {token.symbol})
				<Text style={styles.available}> Available</Text>
			</Text>
		</View>
		<Arrow />
	</TouchableOpacity>
);

export default Card;