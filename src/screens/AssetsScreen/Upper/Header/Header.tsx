import React from 'react';
import { useNavigation } from '@hooks';
import { TokenType } from '@styles';
import { Text, Token, Icon, View, Touchable } from '@components';
import { MinkeToken } from '@models/types/token.types';

export interface HeaderProps {
	coin: MinkeToken;
}

const Header: React.FC<HeaderProps> = ({ coin }) => {
	const navigation = useNavigation();
	return (
		<View row cross="center" mb="m" ph="s">
			<Touchable mr="s" onPress={() => navigation.goBack()}>
				<Icon
					name="arrowBackStroke"
					size={24}
					color="text7"
				/>
			</Touchable>

			<Token
				name={coin.symbol.toLowerCase() as TokenType}
				size={40}
			/>

			<View ml="xxs">
				<Text weight="bold" type="tSmall">
					{coin.name}
				</Text>
				<Text weight="semiBold" type="lSmall">
					${coin.symbol}
				</Text>
			</View>

		</View>
	);
};

export default Header;
