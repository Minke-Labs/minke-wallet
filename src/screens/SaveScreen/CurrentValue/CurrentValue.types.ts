import { DepositProtocol } from '@models/deposit';

export interface CurrentValueProps {
	depositsBalance: number;
	apy: string | undefined;
	protocol: DepositProtocol | undefined;
}
