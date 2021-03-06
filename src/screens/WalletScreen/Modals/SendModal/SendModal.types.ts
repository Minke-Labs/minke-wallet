import { ResultProps } from '../../WalletScreen.types';

interface UserProps {
	name: string;
	address: string;
}

interface SendModalProps {
	onDismiss: () => void;
	onError: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
	isVisible: boolean;
}

export type { UserProps, SendModalProps };
