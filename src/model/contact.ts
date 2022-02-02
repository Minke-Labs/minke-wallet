import { getAddress } from 'ethers/lib/utils';
import { loadObject, saveObject } from './keychain';

export const getAllContacts = async (): Promise<ContactItem[]> => {
	const contacts = (await loadObject('minkeContacts')) || [];

	return contacts as ContactItem[];
};

export const saveAllContacts = async (contacts: ContactItem[] = []) => {
	await saveObject('minkeContacts', contacts);
};

const formatAddress = (address: string): string => {
	if (address.includes('.')) {
		return address;
	}
	return getAddress(address);
};

export const contactCreate = async (name: string, address: string) => {
	const contact = { name, address: formatAddress(address) };
	const existingContacts = await getAllContacts();

	existingContacts.push(contact);
	await saveAllContacts(existingContacts);
	return contact;
};

export interface ContactItem {
	address: string;
	name: string;
}
