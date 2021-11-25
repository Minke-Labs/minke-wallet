import {loadObject, saveObject} from "./keychain";
import {publicAccessControlOptions} from "./wallet";


export const contactCreate = async (name: string, address: string) => {
    const contact = {name, address}
    const existingContacts = await getAllContacts();

    existingContacts.push(contact);
    await saveAllContacts(existingContacts);
    return contact;
}

export const getAllContacts = async (): Promise<ContactItem[]> => {
     const contacts = await loadObject('minkeContacts') || [];

     return contacts as ContactItem[];
}

export const saveAllContacts = async (contacts: ContactItem[] = []) => {
    await saveObject('minkeContacts', contacts, publicAccessControlOptions);
}

export interface ContactItem {
    address: string;
    name: string;
}
