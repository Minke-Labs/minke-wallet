import WalletConnect from '@walletconnect/client';

export interface WalletConnectSession {
	[key: string]: WalletConnect['session'];
}

export interface CallbackParams {
	approved: boolean;
	chainId: number;
	accountAddress: string;
	peerId: string;
	dappScheme: string;
	dappName: string;
	dappUrl: string;
}

export interface Meta {
	chainId: number;
	dappName: string;
	dappScheme: string;
	dappUrl: string;
	imageUrl: string;
	peerId: string;
}

export interface HandleApprovalParams {
	connector: WalletConnect;
	m: Meta;
	handleApproval: (params: CallbackParams) => void;
}
