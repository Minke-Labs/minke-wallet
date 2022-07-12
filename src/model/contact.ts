import { getAddress } from 'ethers/lib/utils';
import { loadObject, saveObject, publicAccessControlOptions } from './keychain';

export const getAllContacts = async (): Promise<ContactItem[]> => {
	const contacts = (await loadObject('minkeContacts')) || [];
	return contacts as ContactItem[];
};

export const saveAllContacts = async (contacts: ContactItem[] = []) => {
	await saveObject('minkeContacts', contacts, publicAccessControlOptions);
};

const formatAddress = (address: string): string => {
	if (address.includes('.')) {
		return address;
	}
	return (!!address && getAddress(address)) || '';
};

export const searchContact = async (address: string): Promise<ContactItem | undefined> => {
	const existingContacts = await getAllContacts();
	return existingContacts.find((c) => c.address.toLocaleLowerCase() === address.toLowerCase());
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
