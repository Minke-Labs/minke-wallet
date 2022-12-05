import { Network } from '@models/network';

export interface GasOptionProps {
	type: 'normal' | 'fast' | 'slow';
	disabled?: boolean;
	onSelectGas?: () => void;
	selected?: boolean;
	gasPrice: number;
	usdPrice: number;
	waiting: string | null;
	gasLimit: number;
	network: Network;
}
