import React, { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import PrimaryButton from '@src/components/PrimaryButton';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { styles } from './TransactionTransfer.styles';

interface UserProps {
	name: string;
	address: string;
}

interface TransactionTransferProps {
	user: UserProps;
	coin: string;
}

const Card = () => (
	<View style={styles.cardContainer}>
		<Image style={styles.cardImage} source={require('@assets/eth.png')} />
		<View style={{ flex: 1 }}>
			<Text style={styles.cardTitle}>Ethereum</Text>
			<Text style={styles.cardDesc}>$200 (0.045 ETH) Available</Text>
		</View>
	</View>
);

const TransactionTransfer: React.FC<TransactionTransferProps> = ({ user, coin }) => {
	const [number, onChangeNumber] = useState('');
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={require('@assets/eth.png')} />
				<Image
					style={[styles.image, { marginLeft: -20, zIndex: -1 }]}
					source={require('@assets/wallet-created.png')}
				/>
			</View>

			<Text style={styles.title}>
				How much <Text style={styles.titleHighlight}>{coin === 'Ethereum' ? 'ETH' : coin}</Text> do you want to
				send to <Text style={styles.titleHighlight}>{user.name}</Text>?
			</Text>

			<Card />

			<TextInput
				style={styles.input}
				onChangeText={(txt: string) => onChangeNumber(txt.replace(/[^0-9]/g, ''))}
				value={number}
				placeholder="$00.00"
				keyboardType="numeric"
				autoFocus
			/>

			<PrimaryButton disabled={!number}>Send</PrimaryButton>

			<KeyboardSpacer />
		</View>
	);
};

export default TransactionTransfer;
