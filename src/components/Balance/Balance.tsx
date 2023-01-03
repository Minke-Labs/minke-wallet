import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { numberFormat, tokenBalanceFormat } from '@helpers/utilities';
import { useGlobalWalletState, useLanguage, useNavigation, useTheme } from '@hooks';
import { MinkeToken } from '@models/types/token.types';
import Paper from '@src/components/Paper/Paper';
import SendModalComponent from '@src/components/SendModalComponent/SendModalComponent';
import Text from '@src/components/Text/Text';
import View from '@src/components/View/View';

import Selector from './Selector/Selector';

interface BalanceProps {
	coin: MinkeToken;
	buySellToken?: MinkeToken | undefined; // used for buy and sell. holds the correct balance, not the aggregation
	stablecoin?: boolean;
}

const Balance: React.FC<BalanceProps> = ({ coin, stablecoin, buySellToken }) => {
	const [sendModal, setSendModal] = useState(false);
	const [active, setActive] = useState(false);
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	const navigation = useNavigation();
	const {
		network: { topUpTokens }
	} = useGlobalWalletState();

	const handleBuy = () => {
		if (topUpTokens.map(({ symbol }) => symbol).includes(coin.symbol)) {
			navigation.navigate('AddFundsScreen', { topupToken: buySellToken || coin });
		} else {
			navigation.navigate('ExchangeScreen', { destToken: buySellToken || coin });
		}
	};

	return (
		<>
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
							{i18n.t('Components.Balance.balance')}
						</Text>
						{!stablecoin && <Selector coinSymbol={coin.symbol} {...{ active, setActive }} />}
					</View>
					<Text type="dMedium">
						{coin.balance
							? active
								? `${tokenBalanceFormat(coin.balance!)} ${coin.symbol}`
								: `${numberFormat(coin.balanceUSD!)}`
							: `${numberFormat(0)}`}
					</Text>
				</View>

				<View h={56} row>
					<TouchableOpacity activeOpacity={0.6} onPress={handleBuy} style={{ flex: 1 }}>
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
								{i18n.t('Components.Balance.Buttons.buy')}
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
								{i18n.t('Components.Balance.Buttons.sell')}
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} onPress={() => setSendModal(true)} style={{ flex: 1 }}>
						<View main="center" cross="center" style={{ flex: 1 }}>
							<Text type="lLarge" color="cta1" weight="semiBold">
								{i18n.t('Components.Balance.Buttons.send')}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</Paper>
			<SendModalComponent {...{ sendModal, setSendModal, coin }} />
		</>
	);
};

export default Balance;
