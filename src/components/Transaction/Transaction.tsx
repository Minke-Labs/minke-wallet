import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { smallWalletAddress, getENSAddress } from '@models/wallet';
import { searchContact } from '@models/contact';
import { formatUnits } from 'ethers/lib/utils';
import { format } from 'date-fns';
import * as Linking from 'expo-linking';
import { globalWalletState } from '@src/stores/WalletStore';
import { network } from '@src/model/network';
import Text from '../Text/Text';
import Card from '../Card/Card';
import TransactionIcon from '../TransactionIcon/TransactionIcon';
import { truncate } from './Transaction.utils';
import { TransactionProps } from './Transaction.types';

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
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
				<Text style={{ fontSize: 12 }}>
					{value && Math.trunc(Number(formatUnits(value, tokenDecimal))) > 0
						? truncate(formatUnits(value, tokenDecimal), 2)
						: truncate(formatUnits(value, tokenDecimal), 6)}{' '}
					{tokenSymbol || token}
				</Text>
			}
			style={{ opacity: isError === '1' ? 0.3 : 1 }}
			onPress={openTransaction}
		/>
	);
};

export default Transaction;
