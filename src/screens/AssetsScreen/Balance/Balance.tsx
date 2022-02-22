/* eslint-disable no-console */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { WalletToken } from '@models/wallet';
import Buttons from './Buttons';
import Selector from './Selector';

interface BalanceProps {
	coin: WalletToken;
}

const Balance: React.FC<BalanceProps> = ({ coin }) => {
	const { colors } = useTheme();
	const [active, setActive] = useState(false);

	return (
		<View
			style={{
				width: '100%',
				height: 146,
				borderRadius: 16,
				marginBottom: 16,
				overflow: 'hidden',
				backgroundColor: colors.background2
			}}
		>
			<View
				style={{
					flex: 1,
					paddingTop: 16,
					paddingLeft: 24,
					paddingRight: 12
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: 8
					}}
				>
					<Text color="text4">Balance</Text>
					<Selector coinSymbol={coin.symbol} {...{ active, setActive }} />
				</View>
				<Text style={{ fontSize: 32, lineHeight: 39 }}>
					{active ? `$${coin.balance.toFixed(5)}` : `$${coin.balanceUSD.toFixed(5)}`}
				</Text>
			</View>

			<Buttons onPress={() => console.log('PRESSED!')} />
		</View>
	);
};

export default Balance;
