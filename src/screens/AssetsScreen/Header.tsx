import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@hooks';
import { WalletToken } from '@models/wallet';
import { TokenType } from '@styles';
import { Text, Token, Icon } from '@components';
import { coinParamFromSymbol } from '@helpers/utilities';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 32,
		paddingHorizontal: 24
	}
});

interface HeaderProps {
	coin: WalletToken;
}

const Header: React.FC<HeaderProps> = ({ coin }) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity style={{ marginRight: 24 }} onPress={() => navigation.goBack()}>
				<Icon name="arrowBackStroke" size={24} color="text7" />
			</TouchableOpacity>
			<Token name={coin.symbol.toLowerCase() as TokenType} size={40} />
			<View style={{ marginLeft: 8 }}>
				<Text weight="extraBold" style={{ fontSize: 18 }}>
					{coinParamFromSymbol({ symbol: coin.symbol, type: 'name' })}
				</Text>
				<Text>${coin.symbol}</Text>
			</View>
		</View>
	);
};

export default Header;
