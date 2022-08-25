/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Paper, Text } from '@components';
import { useLanguage, useNavigation, useTheme } from '@hooks';
import { MinkeToken } from '@models/types/token.types';
import Selector from './Selector/Selector';

interface BlanceProps {
	coin: MinkeToken;
}

const Balance: React.FC<BlanceProps> = ({ coin }) => {
	const [active, setActive] = useState(false);
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const navigation = useNavigation();

	return (
		<Paper style={{ overflow: 'hidden' }} mb="xs">
			<View
				bgc="background2"
				ph="s"
				pv="xs"
				style={{
					borderBottomWidth: 1,
					borderBottomColor: colors.background1
				}}
			>
				<View row main="space-between">
					<Text type="lMedium" weight="semiBold" color="text3">
						{i18n.t('AssetsScreen.Balance.Balance')}
						{/* @@@ - CHANGE LOCATION OF TRANSLATION */}
					</Text>
					<Selector coinSymbol={coin.symbol} {...{ active, setActive }} />
				</View>
				<Text type="dMedium">$1023.0854</Text>
			</View>

			<View h={56} row>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => navigation.navigate('ExchangeScreen', { destToken: coin })}
					style={{ flex: 1 }}
				>
					<View
						main="center"
						cross="center"
						style={{
							flex: 1,
							borderRightWidth: 1,
							borderRightColor: colors.background1
						}}
					>
						<Text type="lLarge" color="cta1" weight="semiBold">
							Buy
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={() => navigation.navigate('ExchangeScreen', { sourceToken: coin })}
					style={{ flex: 1 }}
				>
					<View
						main="center"
						cross="center"
						style={{
							flex: 1,
							borderRightWidth: 1,
							borderRightColor: colors.background1
						}}
					>
						<Text type="lLarge" color="cta1" weight="semiBold">
							Sell
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={() => null} style={{ flex: 1 }}>
					<View main="center" cross="center" style={{ flex: 1 }}>
						<Text type="lLarge" color="cta1" weight="semiBold">
							Send
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</Paper>
	);
};

export default Balance;
