import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Token, Icon, Text } from '@components';
import { TokenType } from '@styles';
import { useTheme } from '@hooks';
import { styles } from './CoinCard.styles';
import { CoinCardProps } from './CoinCard.types';

const CoinCard: React.FC<CoinCardProps> = ({ coin, onSelect, description }) => {
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
					<Token size={40} name={(description || symbol).toLowerCase() as TokenType} />
					<View style={{ marginLeft: 16 }}>
						<Text weight="bold" style={{ fontSize: 16 }}>
							{name}
						</Text>
						<Text style={{ fontSize: 12 }}>{description || symbol}</Text>
					</View>
				</View>
				<Icon name="arrowBackStroke" style={{ transform: [{ rotate: '180deg' }] }} size={24} color="text7" />
			</View>
		</TouchableOpacity>
	);
};

export default CoinCard;
