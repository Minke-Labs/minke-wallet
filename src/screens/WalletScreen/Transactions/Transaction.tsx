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
	const [token, setToken] = React.useState('');

	useEffect(() => {
		let mounted = true;
		const formatAddress = async () => {
			const ens = await getENSAddress(source);
			if (ens) {
				setFormattedSource(ens);
			}
		};

		const fetchDefaultToken = async () => {
			const { nativeTokenSymbol } = await network();
			if (mounted) {
				setToken(nativeTokenSymbol);
			}
		};

		fetchDefaultToken();
		formatAddress();
		// eslint-disable-next-line no-return-assign
		return () => (mounted = false);
	}, []);

	const openTransaction = async () => {
		const { etherscanURL } = await network();
		Linking.openURL(`${etherscanURL}/tx/${hash}`);
	};

	return (
		<Card
			image={<TransactionIcon received={received} />}
			title={format(timestamp, 'MM/dd/yyyy hh:mm aa')}
			subtitle={`${received ? 'From' : 'To'}: ${formattedSource}`}
			right={
				// eslint-disable-next-line react/jsx-wrap-multilines
				<Text style={{ fontSize: 12 }}>
					{value ? formatUnits(value, tokenDecimal) : ''} {tokenSymbol || token}
				</Text>
			}
			style={{
				opacity: isError === '1' ? 0.3 : 1
			}}
			onPress={openTransaction}
		/>
	);
};

export default Transaction;
