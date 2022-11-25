import { DepositProtocol } from '@models/deposit';

export interface SearchDepositProtocolsProps {
	visible: boolean;
	onDismiss: () => void;
	selectedProtocol: DepositProtocol | undefined;
	onChangeDepositProtocol: (d: DepositProtocol) => void;
}
