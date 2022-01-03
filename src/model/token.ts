export interface ParaswapToken {
	symbol: string;
	address: string;
	decimals: number;
	img: string;
	network: number;
}
export interface TokenResponse {
	tokens: Array<ParaswapToken>;
}

export const paraswapTokens = async (): Promise<TokenResponse> => {
	const result = await fetch('https://apiv5.paraswap.io/tokens');
	return result.json();
};

export const ether: ParaswapToken = {
	symbol: 'ETH',
	address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	decimals: 18,
	img: 'https://img.paraswap.network/ETH.png',
	network: 1
};
