import { useState, useEffect } from 'react';
import { isAddress } from 'ethers/lib/utils';
import { resolveENSAddress } from '@src/model/wallet';
import { contactCreate } from '@models/contact';
import { useGlobalContactState } from '@hooks';

interface UseAddContact {
	onContactAdded: () => void;
}

export const useAddContact = ({ onContactAdded }: UseAddContact) => {
	const state = useGlobalContactState();
	const [name, setName] = useState<string>();
	const [address, setAddress] = useState<string>();
	const [ensAddress, setEnsAddress] = useState<string>();

	useEffect(() => {
		const lookForENS = async () => {
			if (address && address.includes('.')) {
				const resolvedAddress = await resolveENSAddress(address);
				setEnsAddress(resolvedAddress!);
			} else {
				setEnsAddress(undefined);
			}
		};
		lookForENS();
	}, [address]);

	const validAddress = !!address && (isAddress(address) || isAddress(ensAddress || ''));

	const onContactCreate = async () => {
		if (name && validAddress) {
			const newContact = await contactCreate(name, address);
			if (newContact) {
				state.contactList.merge([newContact]);
				onContactAdded();
			}
		}
	};

	return {
		name,
		setName,
		address,
		setAddress,
		ensAddress,
		validAddress,
		onContactCreate
	};
};
