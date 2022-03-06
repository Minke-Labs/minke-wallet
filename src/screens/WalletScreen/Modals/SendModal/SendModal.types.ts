import { ResultProps } from '../../WalletScreen.types';

interface UserProps {
	name: string;
	address: string;
}

interface SendModalProps {
	onDismiss: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
}

export type { UserProps, SendModalProps };
