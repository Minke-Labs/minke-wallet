import { useEffect, useState } from 'react';
import { useNavigation } from '@hooks';
import { usdCoin } from '@src/model/deposit';

interface UseNotAbleToSaveModalProps {
	onDismiss: () => void;
	onAddFunds: () => void;
	visible: boolean;
}
export const useNotAbleToSaveModal = ({ onDismiss, onAddFunds, visible }: UseNotAbleToSaveModalProps) => {
	const navigation = useNavigation();
	const [defaultUSDCoin, setDefaultUSDCoin] = useState('');

	const goToExchange = () => {
		onDismiss();
		navigation.navigate('ExchangeScreen');
	};

	const onAddFundsPressed = () => {
		onAddFunds();
	};

	useEffect(() => {
		const loadDefaultUSDCoin = async () => {
			setDefaultUSDCoin(await usdCoin());
		};
		if (visible) {
			loadDefaultUSDCoin();
		}
	}, [visible]);

	return {
		defaultUSDCoin,
		goToExchange,
		onAddFundsPressed
	};
};
