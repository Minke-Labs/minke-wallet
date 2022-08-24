import { MinkeToken } from '@models/types/token.types';

export interface CardProps {
	token: MinkeToken;
	onSelected?: (token: MinkeToken) => void;
}
