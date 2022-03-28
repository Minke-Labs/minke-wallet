import { ResultProps } from '../../WalletScreen.types';

interface SentModalProps {
	sentObj: ResultProps | undefined;
	onDismiss: () => void;
}

export { SentModalProps };
