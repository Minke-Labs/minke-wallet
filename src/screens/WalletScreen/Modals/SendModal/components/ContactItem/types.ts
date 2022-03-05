import { ContactItem } from '@src/model/contact';

interface ContactProps {
	contact: ContactItem;
	onSelected: (coin: ContactItem) => void;
}

export type { ContactProps };
