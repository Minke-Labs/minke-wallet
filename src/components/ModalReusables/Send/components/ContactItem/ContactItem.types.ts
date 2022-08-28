import { ContactItem } from '@src/model/contact';

interface ContactItemProps {
	contact: ContactItem;
	onSelected: (coin: ContactItem) => void;
}

export type { ContactItemProps };
