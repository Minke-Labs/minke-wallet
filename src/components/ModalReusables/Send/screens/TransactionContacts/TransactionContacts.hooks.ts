import { useState, useCallback, useEffect } from 'react';
import { isAddress } from 'ethers/lib/utils';
import { resolveDomainAddress, smallWalletAddress } from '@models/wallet';
import { useKeyboard, useWallets, useGlobalContactState } from '@hooks';
import { contactCreate, ContactItem } from '@models/contact';
import { debounce } from 'lodash';
import { TransactionContactsProps } from './TransactionContacts.types';

export const useTransactionContacts = ({ onSelected, onContactAdded }: TransactionContactsProps) => {
	const [name, setName] = useState<string>();
	const [address, setAddress] = useState('');
	const [deboucedAddress, setDebouncedAddress] = useState('');
	const [customDomain, setCustomDomain] = useState<string>();
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
		const lookForCustomDomain = async () => {
			if (deboucedAddress && deboucedAddress.includes('.')) {
				setCustomDomain((await resolveDomainAddress(address)) || undefined);
			} else {
				setCustomDomain(undefined);
			}
		};

		lookForCustomDomain();
	}, [deboucedAddress]);

	const debouncedSearch = useCallback(
		debounce((search: string) => {
			setDebouncedAddress(search);
		}, 850),
		[]
	);

	const handleAddressChange = (a: string) => {
		setAddress(a);
		debouncedSearch(a);
	};

	const validAddress =
		!!address && (address !== deboucedAddress || isAddress(address) || isAddress(customDomain || ''));

	const onSendAddress = () => {
		if (validAddress && onSelected) {
			onSelected({ name: address, address });
		}
	};

	const onContactCreate = async () => {
		if (name && validAddress) {
			const newContact = await contactCreate(name, address);
			if (newContact) {
				state.contactList.merge([newContact]);
				if (onContactAdded) onContactAdded();
			}
		}
	};

	return {
		name,
		setName,
		customDomain,
		contactList: [...contactList, ...availableAddresses()],
		address,
		setAddress: handleAddressChange,
		keyboardVisible,
		validAddress,
		onSendAddress,
		onContactCreate
	};
};
