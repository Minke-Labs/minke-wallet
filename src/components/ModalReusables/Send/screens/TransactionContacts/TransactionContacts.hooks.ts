import { useState, useCallback, useEffect } from 'react';
import { isAddress } from 'ethers/lib/utils';
import { resolveENSAddress, smallWalletAddress } from '@models/wallet';
import { useKeyboard, useWallets, useGlobalContactState } from '@hooks';
import { ContactItem } from '@models/contact';
import { TransactionContactsProps } from './TransactionContacts.types';

export const useTransactionContacts = ({ onSelected }: TransactionContactsProps) => {
	const [address, setAddress] = useState('');
	const [ensAddress, setEnsAddress] = useState<string>();
	const state = useGlobalContactState();
	const { contactList = [] } = state.value;
	const keyboardVisible = useKeyboard();
	const { wallets, address: selectedAddress } = useWallets();

	const availableAddresses = useCallback(
		(): ContactItem[] =>
			Object.values(wallets || [])
				.filter((wallet) => wallet.address !== selectedAddress)
				.map(({ address: addr }) => ({
					name: smallWalletAddress(addr, 9),
					address: addr
				})),
		[wallets]
	);

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
		contactList: [...contactList, ...availableAddresses()],
		address,
		setAddress,
		keyboardVisible,
		validAddress,
		onSendAddress
	};
};
