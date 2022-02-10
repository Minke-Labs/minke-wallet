import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useState } from '@hookstate/core';
import { Transaction as ITransaction, smallWalletAddress, getENSAddress } from '@models/wallet';
import { formatUnits } from 'ethers/lib/utils';
import { format } from 'date-fns';
import * as Linking from 'expo-linking';
import { globalWalletState } from '@src/stores/WalletStore';
import { network } from '@src/model/network';
import { Text, Card } from '@components';
import TransactionIcon from './TransactionIcon';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
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
		alignContentRight: {
			alignItems: 'flex-end'
		},

		row: {
			flexDirection: 'row',
			justifyContent: 'space-between'
		},
		fontSizeDefault: {
			fontSize: 16
		}
	});

const Transaction = ({ transaction }: { transaction: ITransaction }) => {
	const wallet = useState(globalWalletState());
	const address = wallet.address.value;
	const { from, to, timeStamp, isError, value, tokenSymbol, tokenDecimal = '18', hash } = transaction;
	const received = to.toLowerCase() === address.toLowerCase();
	const source = received ? from : to;
	const timestamp = new Date(+timeStamp * 1000);
	const [formattedSource, setFormattedSource] = React.useState(smallWalletAddress(source));
	const [url, setUrl] = React.useState('');
	const [token, setToken] = React.useState('');

	useEffect(() => {
		const formatAddress = async () => {
			const ens = await getENSAddress(source);
			if (ens) {
				setFormattedSource(ens);
			}
		};

		const fetchURL = async () => {
			const { etherscanURL, defaultToken } = await network();
			setUrl(`${etherscanURL}tx/${hash}`);
			setToken(defaultToken);
		};

		fetchURL();
		formatAddress();
	}, []);

	return (
		<Card
			image={<TransactionIcon received={received} />}
			title={format(timestamp, 'MM/dd/yyyy hh:mm aa')}
			subtitle={`${received ? 'From' : 'To'}: ${formattedSource}`}
			right={(
				<Text style={{ fontSize: 12 }}>
					{value ? formatUnits(value, tokenDecimal) : ''} {tokenSymbol || token}
				</Text>
			)}
			style={{
				opacity: isError === '1' ? 0.3 : 1
			}}
			onPress={() => Linking.openURL(url)}
		/>
	);
};

export default Transaction;
