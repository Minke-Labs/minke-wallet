/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { getENSAddress, smallWalletAddress, ZapperTransaction } from '@models/wallet';
import { searchContact } from '@models/contact';
import * as Linking from 'expo-linking';
import { network } from '@src/model/network';
import { truncate } from './Transaction.utils';

interface UseTransactionProps {
	transaction: ZapperTransaction;
}

export const useTransaction = ({ transaction }: UseTransactionProps) => {
	const {
		from,
		timeStamp,
		hash,
		direction,
		amount,
		txSuccessful,
		symbol,
		destination,
		subTransactions = [],
		pending = false,
		topUp = false
	} = transaction;
	const received = direction === 'incoming';
	const exchange = direction === 'exchange';

	// subTransactions
	const sourceToken = subTransactions.find(({ type }) => type === 'outgoing');
	const toToken = subTransactions.find(({ type }) => type === 'incoming');
	const source = received ? from : destination;
	const timestamp = new Date(+timeStamp * 1000);
	const [formattedSource, setFormattedSource] = React.useState(smallWalletAddress(source));

	useEffect(() => {
		const formatAddress = async () => {
			const contact = await searchContact(source);
			if (contact?.name) {
				setFormattedSource(contact.name);
			} else {
				const ens = await getENSAddress(source);
				if (ens) {
					const ensContact = await searchContact(ens);
					setFormattedSource(ensContact?.name || ens);
				} else {
					setFormattedSource(smallWalletAddress(source));
				}
			}
		};
		formatAddress();
	}, []);

	const openTransaction = async () => {
		const { name } = await network();
		const nets = ['Ethereum', 'Ropsten', 'Kovan'];
		const getNetwork = () => {
			if (nets.includes(name)) return 'Etherscan';
			return 'Polygonscan';
		};
		Alert.alert(`View on ${getNetwork()}?`, '', [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'OK',
				onPress: async () => {
					const { etherscanURL } = await network();
					Linking.openURL(`${etherscanURL}/tx/${hash}`);
				}
			}
		]);
	};

	const subtitle = topUp
		? 'Adding via Apple Pay'
		: exchange
		? `Swap ${sourceToken?.symbol} to ${toToken?.symbol}`
		: `${received ? 'From' : 'To'}: ${formattedSource}`;

	return {
		received,
		value: truncate((exchange ? toToken?.amount : amount)!, 6),
		token: exchange ? toToken?.symbol : symbol,
		failed: !txSuccessful,
		pending,
		topUp,
		title: format(timestamp, "h'h'mm aaa"),
		subtitle,
		exchange,
		openTransaction
	};

	// { received, title, value, token, failed, pending, openTransaction, topUp, subtitle }
};
