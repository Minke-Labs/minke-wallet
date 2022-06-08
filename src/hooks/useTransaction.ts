/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { format } from 'date-fns';
import { getENSAddress, smallWalletAddress, ZapperTransaction } from '@models/wallet';
import { searchContact } from '@models/contact';
import * as Linking from 'expo-linking';
import { network } from '@src/model/network';
import { depositStablecoins, interestBearingTokens } from '@models/deposit';
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
		depositStablecoins.includes(sourceToken.symbol.toUpperCase()) &&
		interestBearingTokens.includes(toToken.symbol.toLowerCase());
	const withdraw =
		exchange &&
		depositStablecoins.includes(toToken.symbol.toUpperCase()) &&
		interestBearingTokens.includes(sourceToken.symbol.toLowerCase());
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
				} else {
					setFormattedSource(smallWalletAddress(source, walletDigits));
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
		Alert.alert(`${i18n.t('Components.Transaction.view_on')} ${getNetwork()}?`, '', [
			{
				text: i18n.t('Components.Transaction.cancel'),
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
		? i18n.t('Components.Transaction.adding_via_apple_pay')
		: withdraw
			? i18n.t('Components.Transaction.withdrew_from_savings')
			: deposit
				? i18n.t('Components.Transaction.deposited_in_savings')
				: exchange
					? i18n.t('Components.Transaction.swap', { source: sourceToken?.symbol, dest: toToken?.symbol })
					: `${
						received ? i18n.t('Components.Transaction.from') : i18n.t('Components.Transaction.to')
					}: ${formattedSource}`;

	return {
		received,
		value: truncate((exchange ? toToken?.amount : amount)!, 6),
		token: withdraw
			? toToken.symbol
			: deposit
				? sourceToken.symbol
				: exchange
					? toToken.symbol
					: (received ? toToken?.symbol : sourceToken?.symbol) || symbol,
		failed: !txSuccessful,
		pending,
		topUp,
		title: format(timestamp, 'h:mm aaa'),
		subtitle,
		exchange,
		deposit,
		withdraw,
		timestamp: timeStamp,
		formattedSource,
		openTransaction
	};
};

export default useTransaction;