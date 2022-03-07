import { AaveBalances } from '@models/deposit';

export interface BodyProps {
	lending: AaveBalances['products']['products'][0];
}
