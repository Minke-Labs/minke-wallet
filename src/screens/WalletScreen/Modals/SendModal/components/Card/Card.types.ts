import { MinkeToken } from '@models/token';

export interface CardProps {
	token: MinkeToken;
	onSelected?: (token: MinkeToken) => void;
}
