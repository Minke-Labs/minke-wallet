/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { getENSAddress, smallWalletAddress, ZapperTransaction } from '@models/wallet';
import { searchContact } from '@models/contact';
import * as Linking from 'expo-linking';
import { network } from '@src/model/network';
import { depositStablecoins, interestBearingTokens, interestBearingTokensAndProtocols } from '@models/deposit';
import useLanguage from './useLanguage';

export const truncate = (num: number | string, idx = 2) =>
	+num.toString().slice(0, num.toString().indexOf('.') + (idx + 1));

interface UseTransactionProps {
	transaction: ZapperTransaction;
	walletDigits?: number;
}

const useTransaction = ({ transaction, walletDigits = 6 }: UseTransactionProps) => {
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
	const { i18n } = useLanguage();
	// subTransactions
	const sourceToken = subTransactions.find(({ type }) => type === 'outgoing');
	const toToken = subTransactions.find(({ type }) => type === 'incoming');
	const exchange = direction === 'exchange' && !!sourceToken && !!toToken;
	const deposit =
		exchange &&
		depositStablecoins.includes(sourceToken!.symbol.toUpperCase()) &&
		interestBearingTokens.includes(toToken!.symbol.toLowerCase());
	const withdraw =
		exchange &&
		depositStablecoins.includes(toToken!.symbol.toUpperCase()) &&
		interestBearingTokens.includes(sourceToken!.symbol.toLowerCase());
	const source = received ? from : destination;
	const timestamp = new Date(+timeStamp * 1000);
	const [formattedSource, setFormattedSource] = React.useState(smallWalletAddress(source, walletDigits));

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
				}
			}
		};
		formatAddress();
	}, []);

	const openTransaction = async () => {
		const { etherscanURL } = await network();
		Linking.openURL(`${etherscanURL}/tx/${hash}`);
	};

	const subtitle = topUp
		? i18n.t('Components.Transaction.adding_via_apple_pay')
		: withdraw
		? i18n.t('Components.Transaction.withdrew_from_savings')
		: deposit
		? i18n.t('Components.Transaction.deposited_in_savings')
		: exchange
		? i18n.t('Components.Transaction.swap')
		: `${
				received ? i18n.t('Components.Transaction.from') : i18n.t('Components.Transaction.to')
		  }: ${formattedSource}`;

	const description = topUp
		? i18n.t('Components.Transaction.top_up')
		: withdraw
		? i18n.t('Components.Transaction.savings_withdrew')
		: deposit
		? i18n.t('Components.Transaction.savings_deposited')
		: exchange
		? i18n.t('Components.Transaction.exchanged')
		: received
		? i18n.t('Components.Transaction.received')
		: i18n.t('Components.Transaction.sent');

	return {
		received,
		fromAmount: truncate((exchange ? sourceToken?.amount : amount)!, 6),
		value: truncate((exchange ? toToken?.amount : amount)!, 6),
		token: withdraw
			? toToken!.symbol
			: deposit
			? sourceToken!.symbol
			: exchange
			? toToken!.symbol
			: (received ? toToken?.symbol : sourceToken?.symbol) || symbol,
		failed: !txSuccessful,
		pending,
		topUp,
		title: format(timestamp, 'h:mm aaa'),
		date: format(timestamp, 'dd MMMM, yyyy'),
		subtitle,
		exchange,
		deposit,
		withdraw,
		timestamp: timeStamp,
		formattedSource,
		source,
		description,
		hash,
		openTransaction,
		sourceToken,
		toToken,
		protocol: interestBearingTokensAndProtocols[(deposit ? toToken : sourceToken)?.symbol?.toLowerCase() || '']
	};
};

export default useTransaction;
