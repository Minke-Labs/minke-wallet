import { createState } from '@hookstate/core';
import { ContactItem, getAllContacts } from 'old/src/model/contact';

export interface ContactState {
	contactList?: ContactItem[];
}

export const initializeContacts = async (): Promise<ContactState> => ({ contactList: await getAllContacts() });

const globalStateInit = createState(initializeContacts);
export function globalContactState() {
	return globalStateInit;
}
