import { BigNumber } from 'ethers';

interface ValueBoxProps {
	title?: string;
	balance?: {
		eth?: BigNumber | undefined;
		usd?: string | undefined;
	};
}

export { ValueBoxProps };
