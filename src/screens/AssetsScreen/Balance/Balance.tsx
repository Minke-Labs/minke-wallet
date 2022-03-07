/* eslint-disable no-console */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { numberFormat } from '@helpers/utilities';
import Buttons from './Buttons/Buttons';
import Selector from './Selector/Selector';
import { BalanceProps } from './Balance.types';
import styles from './Balance.styles';

const Balance: React.FC<BalanceProps> = ({ coin }) => {
	const { colors } = useTheme();
	const [active, setActive] = useState(false);

	return (
		<View style={[styles.container, { backgroundColor: colors.background2 }]}>
			<View style={styles.valueContainer}>
				<View style={styles.valueContainerTop}>
					<Text color="text4">Balance</Text>
					<Selector coinSymbol={coin.symbol} {...{ active, setActive }} />
				</View>
				<Text type="h2">
					{active ? `${coin.balance.toFixed(2)} ${coin.symbol}` : `${numberFormat(coin.balanceUSD)}`}
				</Text>
			</View>

			<Buttons onPress={() => console.log('PRESSED!')} />
		</View>
	);
};

export default Balance;
