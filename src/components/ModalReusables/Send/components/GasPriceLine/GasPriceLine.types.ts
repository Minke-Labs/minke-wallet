import { Network } from '@models/network';

interface GasPriceLineProps {
	gas: number;
	label: string;
	priceUSD: number;
	network: Network;
}

export type { GasPriceLineProps };
