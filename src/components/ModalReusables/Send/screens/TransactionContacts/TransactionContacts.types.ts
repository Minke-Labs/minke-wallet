import { UserProps } from '../../Send.types';

interface TransactionContactsProps {
	onSelected?: (item: UserProps) => void;
	onContactAdded?: () => void;
}

export type { TransactionContactsProps };
