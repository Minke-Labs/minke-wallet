import { Network } from '@models/network';

export interface WatchModeTagProps {
	needToChangeNetwork: boolean;
	network: Network;
	onPress?: () => void;
}
