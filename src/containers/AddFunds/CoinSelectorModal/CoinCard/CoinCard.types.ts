import { ICoin } from '@helpers/coins';

export interface CoinCardProps {
	coin: ICoin;
	onSelect: Function;
	description?: string | undefined;
}
