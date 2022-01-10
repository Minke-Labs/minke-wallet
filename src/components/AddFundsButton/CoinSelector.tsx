import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { coins, ICoin } from '../../helpers/coins';

const CoinCard = ({ coin, onSelect }: { coin: ICoin; onSelect: Function }) => {
	const { name, symbol, image } = coin;

	const selfStyles = StyleSheet.create({
		card: {
			borderRadius: 16,
			marginBottom: 8
		}
	});

	return (
		<Card onPress={() => onSelect(coin)} style={selfStyles.card}>
			<Card.Title
				title={name}
				subtitle={symbol}
				left={({ size }) => <Image source={image} style={{ width: size, height: size }} />}
				right={() => <IconButton icon="chevron-right" size={40} color="#D0D0D0" />}
			/>
		</Card>
	);
};

const CoinSelector = ({ onSelect }: { onSelect: Function }) => (
	<>
		<CoinCard coin={coins.ethereum} onSelect={onSelect} />
		<CoinCard coin={coins.dai} onSelect={onSelect} />
	</>
);

export default CoinSelector;
