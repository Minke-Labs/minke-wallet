import { MinkeToken } from '@models/types/token.types';

export type ResultProps = {
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
	isVisible: boolean;
	coin?: MinkeToken;
}

export type { UserProps, SendProps };
