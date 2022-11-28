import { Network } from '@models/network';

export interface NetworkTagProps {
	onPress?: () => void;
	info?: boolean;
	network: Network;
}
