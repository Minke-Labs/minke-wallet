import { Network } from '@models/network';

export interface NetworkTagProps {
	onPress?: () => void;
	info?: boolean;
	buying?: boolean;
	network: Network;
}
