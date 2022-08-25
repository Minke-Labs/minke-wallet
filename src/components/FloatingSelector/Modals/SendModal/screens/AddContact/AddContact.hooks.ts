import React, { useEffect } from 'react';
import { useState } from '@hookstate/core';
import { isAddress } from 'ethers/lib/utils';
import { resolveENSAddress } from '@src/model/wallet';
import { contactCreate } from '@models/contact';
import { globalContactState } from '@src/stores/ContactStore';

interface UseAddContact {
	onContactAdded: () => void;
}

export const useAddContact = ({ onContactAdded }: UseAddContact) => {
	const state = useState(globalContactState());
	const [name, setName] = React.useState<string>();
	const [address, setAddress] = React.useState<string>();
	const [ensAddress, setEnsAddress] = React.useState<string>();

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
