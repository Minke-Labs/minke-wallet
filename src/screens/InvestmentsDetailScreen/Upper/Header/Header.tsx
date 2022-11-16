import React from 'react';
import { useNavigation } from '@hooks';
import { Text, Token, Icon, View, Touchable } from '@components';
import { MinkeToken } from '@models/types/token.types';

export interface HeaderProps {
	coin: MinkeToken;
}

const Header: React.FC<HeaderProps> = ({ coin }) => {
	const navigation = useNavigation();
	return (
		<Touchable mr="s" onPress={() => navigation.goBack()}>
			<View row cross="center" mb="m" ph="s">
				<Icon name="arrowBackStroke" size={24} color="text7" />
				<View>
					<Token token={coin} size={40} showNetworkIcon={false} />
				</View>

				<View ml="xxs">
					<Text weight="bold" type="tSmall">
						{coin.name}
					</Text>
					<Text weight="semiBold" type="lSmall">
						${coin.symbol}
					</Text>
				</View>
			</View>
		</Touchable>
	);
};

export default Header;
