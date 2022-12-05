import { DepositProtocol } from '@models/deposit';

export interface DepositProtocolSelectorProps {
	protocol: DepositProtocol | undefined;
	onPress: () => void;
}

export interface TitlesProps {
	protocol: DepositProtocol;
	inline?: boolean;
}
