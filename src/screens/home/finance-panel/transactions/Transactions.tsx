import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import {
	Transaction,
	EtherLastPriceResponse,
	getTransactions,
	smallWalletAddress,
	getEthLastPrice
} from '@models/wallet';
import { BigNumber } from 'ethers';
import { convertEthToUsd } from '@helpers/utilities';
import { formatEther, commify } from 'ethers/lib/utils';
import { format } from 'date-fns';
import { globalWalletState } from '@stores/WalletStore';
import { makeStyles } from './styles';
import transationalReceive from './transational-receive.png';
import transationalSent from './transational-sent.png';

const Transactions = () => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const wallet = globalWalletState();
	const address = (wallet.value.wallet?.address || '').toLowerCase();
	const [transactions, setTransactions] = useState<Array<Transaction>>([]);
	const [ethLastPrice, setEthLastPrice] = useState<EtherLastPriceResponse>();

	useEffect(() => {
		const fetchTransactions = async () => {
			const { result } = await getTransactions(address);
			setTransactions(result);
		};

		const fetchEthLastPrice = async () => {
			setEthLastPrice(await getEthLastPrice());
		};

		fetchEthLastPrice();
		fetchTransactions();
	}, []);

	return (
		<View style={styles.tabsTransactions}>
			<View style={styles.row}>
				<Text style={styles.transactionDateLabel}>Today</Text>
				<Text style={styles.fontSizeSmall}>Day balance: $00.00</Text>
			</View>

			<View style={styles.transactionDayRow}>
				{transactions.map((transaction) => {
					const { from, to, timeStamp } = transaction;
					const received = to.toLowerCase() === address.toLowerCase();
					const timestamp = new Date(+timeStamp * 1000);
					return (
						<View style={(styles.row, styles.transactionItem)} key={transaction.hash}>
							<View style={styles.row}>
								<Image
									source={received ? transationalReceive : transationalSent}
									style={styles.transationalIcon}
								/>
								<View>
									<Text style={styles.fontSizeSmall}>{format(timestamp, 'MM/dd/yyyy hh:mm aa')}</Text>
									<Text style={styles.fontSizeDefault}>
										{received ? 'From' : 'To'} {smallWalletAddress(received ? from : to)}
									</Text>
								</View>
							</View>
							<View style={styles.alignContentRight}>
								<Text style={styles.fontSizeSmall}>{formatEther(transaction.value)} ETH</Text>
								{ethLastPrice ? (
									<Text style={styles.fontBold}>
										~$
										{commify(
											convertEthToUsd(
												BigNumber.from(transaction.value),
												ethLastPrice.result.ethusd
											)
										)}
									</Text>
								) : null}
							</View>
						</View>
					);
				})}
			</View>
		</View>
	);
};

export default Transactions;
