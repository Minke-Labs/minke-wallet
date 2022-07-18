import { ICoin } from '@helpers/coins';

export interface ChooseQuantityModalProps {
	coin: ICoin;
	amount: number | undefined;
	setPresetAmount: Function;
	enableCustomAmount: () => void;
	onPurchase: () => void;
	// onOnramp: () => void;
	onClickBanxa: () => void;
	onChangeCountry: () => void;
}
