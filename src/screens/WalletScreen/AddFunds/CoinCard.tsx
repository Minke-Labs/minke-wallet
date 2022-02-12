import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Token, Icon, Text } from '@components';
import { TokenType } from '@styles';
import { useTheme } from '@hooks';
import { ICoin } from '../../../helpers/coins';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		height: 69,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowOpacity: 0.08,
		shadowColor: '#000',
		borderRadius: 16,
		marginBottom: 8
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}
});

interface CoinCardProps {
	coin: ICoin;
	onSelect: Function;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, onSelect }) => {
	const { name, symbol } = coin;
	const { colors } = useTheme();
	return (
		<TouchableOpacity
			onPress={() => onSelect(coin)}
			activeOpacity={0.6}
			style={[styles.container, { backgroundColor: colors.background2 }]}
		>
			<View style={styles.content}>
				<View style={{ flexDirection: 'row' }}>
					<Token size={40} name={symbol.toLowerCase() as TokenType} />
					<View style={{ marginLeft: 16 }}>
						<Text weight="bold" style={{ fontSize: 16 }}>
							{name}
						</Text>
						<Text style={{ fontSize: 12 }}>{symbol}</Text>
					</View>
				</View>
				<Icon name="arrowBackStroke" style={{ transform: [{ rotate: '180deg' }] }} size={24} color="text7" />
			</View>
		</TouchableOpacity>
	);
};

export default CoinCard;
