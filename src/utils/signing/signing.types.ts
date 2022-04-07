import { Wallet } from 'ethers';

export interface ERC2612PermitMessage {
	owner: string;
	spender: string;
	value: number | string;
	nonce: number | string;
	deadline: number | string;
}

export interface PermitSignatureProps {
	wallet: Wallet;
	owner: string;
	spender: string;
	token: string;
}

export interface ChainDomain {
	name: string;
	version: string;
	chainId: number;
	verifyingContract: string;
}

export interface GetContractNonceProps {
	contract: string;
	userAddress: string;
	provider: any;
}

export interface ApprovalMessage {
	nonce?: number;
	from?: string;
	functionSignature?: string;
}

export interface ApprovalFunctionSignatureProps {
	provider: string;
	userAddress: string;
	privateKey: string;
	contract: string;
	spender: string;
	amount: string;
}

export interface SignTypedDataV3Props {
	privateKey: string;
	data: any;
}
