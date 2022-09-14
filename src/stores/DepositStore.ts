import { createState } from '@hookstate/core';
import { DepositProtocol, fetchDepositProtocol } from '@models/deposit';

const initialize = async (): Promise<DepositProtocol> => {
	const protocol = await fetchDepositProtocol();
	return protocol;
};

const globalStateInit = createState(initialize);
export function globalDepositState() {
	return globalStateInit;
}
