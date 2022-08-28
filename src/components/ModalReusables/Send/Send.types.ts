import { MinkeToken } from '@models/types/token.types';

type ResultProps = {
	hash: string;
	token: MinkeToken;
};

interface UserProps {
	name: string;
	address: string;
}

interface SendProps {
	onDismiss: () => void;
	onError: () => void;
	sentSuccessfully: (obj: ResultProps) => void;
	isVisible: boolean;
}

export type { UserProps, SendProps };
