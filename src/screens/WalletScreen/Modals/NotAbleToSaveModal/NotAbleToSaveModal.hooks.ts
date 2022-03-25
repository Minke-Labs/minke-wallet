import { useEffect, useState } from 'react';
import { useNavigation } from '@hooks';
import { usdCoin } from '@src/model/deposit';

interface UseNotAbleToSaveModalProps {
	onAddFunds: () => void;
	visible: boolean;
	onDismiss: () => void;
}

export const useNotAbleToSaveModal = ({ onAddFunds, visible, onDismiss }: UseNotAbleToSaveModalProps) => {
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
