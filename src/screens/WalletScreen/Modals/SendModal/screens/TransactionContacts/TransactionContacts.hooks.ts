import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { globalContactState } from '@src/stores/ContactStore';
import { isAddress } from 'ethers/lib/utils';
import { resolveENSAddress } from '@models/wallet';
import { useKeyboard, useWallets } from '@hooks';
import { TransactionContactsProps } from './TransactionContacts.types';

export const useTransactionContacts = ({ onSelected }: TransactionContactsProps) => {
	const [address, setAddress] = React.useState('');
	const [ensAddress, setEnsAddress] = React.useState<string>();
	const state = useState(globalContactState());
	const { contactList } = state.value;
	const keyboardVisible = useKeyboard();
	const { wallets, address: selectedAddress } = useWallets();
	const availableAddresses = Object.values(wallets || []).filter((wallet) => wallet.address !== selectedAddress);

	useEffect(() => {
		const lookForENS = async () => {
			if (address && address.includes('.')) {
				setEnsAddress((await resolveENSAddress(address)) || undefined);
			} else {
				setEnsAddress(undefined);
			}
		};
		lookForENS();
	}, [address]);

	const validAddress = !!address && (isAddress(address) || isAddress(ensAddress || ''));

	const onSendAddress = () => {
		if (validAddress) {
			onSelected({ name: address, address });
		}
	};

	return {
		contactList,
		address,
		setAddress,
		keyboardVisible,
		availableAddresses,
		validAddress,
		onSendAddress
	};
};