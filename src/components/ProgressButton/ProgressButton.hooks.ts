import { useState, useCallback } from 'react';
import { useTheme } from '@hooks';
import { Keyboard } from 'react-native';

interface UseProgressButtonProps {
	onFinish: () => void;
	disabled: boolean;
}

export const useProgressButton = ({ onFinish, disabled }: UseProgressButtonProps) => {
	const { colors } = useTheme();
	const [count, setCount] = useState(0);
	const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

	const resetInterval = () => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	};

	const startCounter = useCallback(() => {
		setCount(0);
		resetInterval();
		setIntervalId(setInterval(() => setCount((c) => c + 0.01), 10));
	}, []);

	const stopCounter = () => {
		resetInterval();
		setCount(0);
	};

	const finishCounter = () => {
		resetInterval();
		Keyboard.dismiss();
		onFinish();
	};

	const backgroundColor = () => {
		if (disabled) {
			return colors.detail2;
		}
		return colors.cta1;
	};

	return {
		count,
		backgroundColor,
		startCounter,
		stopCounter,
		finishCounter
	};
};
