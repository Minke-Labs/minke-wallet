import { ImageSourcePropType } from 'react-native';

export const coins = {
	ethereum: { name: 'Ethereum', symbol: 'ETH', image: require('../../assets/eth.png') },
	dai: { name: 'DAI', symbol: 'DAI', image: require('../../assets/dai.png') }
};

export interface ICoin {
	name: string;
	symbol: string;
	image: ImageSourcePropType;
}
