export const coins = {
	ethereum: { name: 'Ethereum', symbol: 'ETH', image: require('../../assets/eth.png') }
};

export interface ICoin {
	name: string;
	symbol: string;
	image: string;
}
