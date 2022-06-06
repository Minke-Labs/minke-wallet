export interface GasOptionProps {
	type: 'normal' | 'fast' | 'slow';
	disabled?: boolean;
	onSelectGas?: () => void;
	selected?: boolean;
	gasPrice: number;
	usdPrice: number;
	waiting: () => string | JSX.Element;
}
