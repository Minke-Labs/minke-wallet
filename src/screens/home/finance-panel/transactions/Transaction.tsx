import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, ActivityIndicator, useTheme } from 'react-native-paper';
import {
	Transaction as ITransaction,
	EtherPriceHistoryResponse,
	smallWalletAddress,
	getPriceHistory,
	Coin
} from '@models/wallet';
import { globalWalletState } from '@stores/WalletStore';
import { BigNumber } from 'ethers';
import { convertEthToUsd } from '@helpers/utilities';
import { formatUnits, commify } from 'ethers/lib/utils';
import { format } from 'date-fns';
import transationalReceive from './transational-receive.png';
import transationalSent from './transational-sent.png';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		row: {
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		transactionItem: {
			marginBottom: 32,
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		transationalIcon: {
			width: 32,
			height: 32,
			marginRight: 8
		},
		fontSizeSmall: {
			color: colors.secondaryText,
			fontSize: 12
		},
		fontSizeDefault: {
			fontSize: 16
		},
		alignContentRight: {
			alignItems: 'flex-end'
		},
		fontBold: {
			fontFamily: 'Inter_800ExtraBold'
		}
	});

const Transaction = ({ transaction }: { transaction: ITransaction }) => {
	const [ethLastPrice, setEthLastPrice] = useState<EtherPriceHistoryResponse>();
	const wallet = globalWalletState();
	const address = (wallet.value.wallet?.address || '').toLowerCase();
	const { from, to, timeStamp, isError, value, tokenSymbol = 'ETH', tokenDecimal = '18' } = transaction;
	const received = to.toLowerCase() === address.toLowerCase();
	const timestamp = new Date(+timeStamp * 1000);
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	useEffect(() => {
		const fetchEthLastPrice = async () => {
			const { allTokens } = wallet.value;
			const coin = allTokens.find((token: Coin) => token.symbol.toLowerCase() === tokenSymbol.toLowerCase());
			if (coin) {
				setEthLastPrice(await getPriceHistory(format(timestamp, 'dd-MM-yyyy'), coin.id));
			}
		};

		fetchEthLastPrice();
	}, []);

	return (
		<View style={[styles.row, styles.transactionItem, { opacity: isError === '1' ? 0.3 : 1 }]}>
			<View style={styles.row}>
				<Image source={received ? transationalReceive : transationalSent} style={styles.transationalIcon} />
				<View>
					<Text style={styles.fontSizeSmall}>{format(timestamp, 'MM/dd/yyyy hh:mm aa')}</Text>
					<Text style={styles.fontSizeDefault}>
						{received ? 'From' : 'To'} {smallWalletAddress(received ? from : to)}
					</Text>
				</View>
			</View>
			<View style={styles.alignContentRight}>
				<Text style={styles.fontSizeSmall}>
					{formatUnits(value, tokenDecimal)} {tokenSymbol}
				</Text>
				{ethLastPrice ? (
					<Text style={styles.fontBold}>
						{received ? '' : '-'}$
						{commify(
							convertEthToUsd(
								BigNumber.from(value),
								(Math.trunc(ethLastPrice.market_data.current_price.usd * 100) / 100).toString()
							)
						)}
					</Text>
				) : (
					<ActivityIndicator animating color={colors.background} />
				)}
			</View>
		</View>
	);
};

export default Transaction;
