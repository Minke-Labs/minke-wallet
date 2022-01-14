import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const ProgressButton = ({ onFinish }: { onFinish: () => void }) => {
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
		onFinish();
	};
	return (
		<TouchableWithoutFeedback
			onPressIn={startCounter}
			onLongPress={finishCounter}
			onPressOut={stopCounter}
			delayLongPress={5000}
			style={{ backgroundColor: '#006AA6', margin: 20, borderRadius: 30, height: 50, overflow: 'hidden' }}
		>
			<View
				style={{
					width: `${count * 33.33}%`,
					height: '100%',
					backgroundColor: '#004F7B'
				}}
			/>
			<Text style={{ textAlign: 'center', position: 'absolute', width: '100%', height: '100%' }}>
				Hold to Confirm
			</Text>
		</TouchableWithoutFeedback>
	);
};

export default ProgressButton;
