// @ts-expect-error - env is a virtualised module via Babel config.
import { WALLET_CONNECT_PROJECT_ID } from '@env';
import { Core } from '@walletconnect/core';
import { ICore } from '@walletconnect/types';
import { IWeb3Wallet, Web3Wallet } from '@walletconnect/web3wallet';

export let web3wallet: IWeb3Wallet;
export let core: ICore;

export async function createWeb3Wallet() {
	// console.log('ENV_PROJECT_ID', ENV_PROJECT_ID);
	// console.log('ENV_RELAY_URL', ENV_RELAY_URL);
	core = new Core({
		// @notice: If you want the debugger / logs
		logger: 'debug',
		projectId: WALLET_CONNECT_PROJECT_ID || process.env.WALLET_CONNECT_PROJECT_ID
	});

	web3wallet = await Web3Wallet.init({
		core,
		metadata: {
			name: 'React Native Web3Wallet',
			description: 'ReactNative Web3Wallet',
			url: 'https://walletconnect.com/',
			icons: ['https://avatars.githubusercontent.com/u/37784886']
		}
	});
}

export async function _pair(params: { uri: string }) {
	return await core.pairing.pair({ uri: params.uri });
}
