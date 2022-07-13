import { Network } from '@models/network';

export interface WrongNetworkParams {
	onDismiss: () => void;
	network: Network;
	description: string;
}
