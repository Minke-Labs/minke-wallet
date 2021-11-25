import {createState} from "@hookstate/core";
import {loadObject} from "../model/keychain";
import {ContactItem, getAllContacts} from "../model/contact";


export interface ContactState {
    contactList?: ContactItem[]
}

export const initializeContacts = async (): Promise<ContactState> => {
  return {contactList: await getAllContacts()}
}

const globalStateInit = createState(initializeContacts)
export function globalContactState() {
    return globalStateInit;

}
