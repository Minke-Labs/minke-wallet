import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useState } from '@hookstate/core';
import { smallWalletAddress, getENSAddress, Transaction } from '@models/wallet';
import { searchContact } from '@models/contact';
import * as Linking from 'expo-linking';
import { globalWalletState } from '@src/stores/WalletStore';
import { network } from '@src/model/network';

interface UseTransactionProps {
	transaction: Transaction;
}

export const useTransaction = ({ transaction }: UseTransactionProps) => {
	const wallet = useState(globalWalletState());
	const address = wallet.address.value;
	const { from, to, timeStamp, isError, value, tokenSymbol, tokenDecimal = '18', hash, pending } = transaction;
	const received = to.toLowerCase() === address.toLowerCase();
	const source = received ? from : to;
	const timestamp = new Date(+timeStamp * 1000);
	const [formattedSource, setFormattedSource] = React.useState(smallWalletAddress(source));
	const [token, setToken] = React.useState('');

	useEffect(() => {
		let mounted = true;
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

		const fetchDefaultToken = async () => {
			const {
				nativeToken: { symbol: nativeTokenSymbol }
			} = await network();
			if (mounted) {
				setToken(nativeTokenSymbol);
			}
		};

		fetchDefaultToken();
		formatAddress();

		return () => {
			mounted = false;
		};
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

	return {
		received,
		timestamp,
		formattedSource,
		value,
		tokenDecimal,
		tokenSymbol,
		token,
		isError,
		pending,
		openTransaction
	};
};
