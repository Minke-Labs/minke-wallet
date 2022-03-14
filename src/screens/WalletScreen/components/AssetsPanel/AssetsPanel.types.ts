import { GestureResponderEvent } from 'react-native';

export interface AssetsPanelProps {
	balance: number;
	address: string;
	onSave: (event: GestureResponderEvent) => void;
	onAddFunds: (event: GestureResponderEvent) => void;
	onWalletAssets: (event: GestureResponderEvent) => void;
}
