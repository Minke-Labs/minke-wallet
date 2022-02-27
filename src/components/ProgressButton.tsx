import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '@src/hooks';

const styles = StyleSheet.create({
	startCounterButton: {
		backgroundColor: '#006AA6',
		marginTop: 40,
		borderRadius: 30,
		height: 50,
		overflow: 'hidden'
	},
	startCounterButtonTextContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	startCounterButtonText: {
		color: 'white',
		fontWeight: 'bold'
	}
});

const ProgressButton = ({
	onFinish,
	title = 'Hold to Confirm',
	disabled = false
}: {
	onFinish: () => void;
	title?: string;
	disabled?: boolean;
}) => {
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
		onFinish();
	};

	const backgroundColor = () => {
		if (disabled) return colors.detail2;
		return colors.cta1;
	};
	return (
		<TouchableWithoutFeedback
			onPressIn={startCounter}
			onLongPress={finishCounter}
			onPressOut={stopCounter}
			delayLongPress={5000}
			style={[styles.startCounterButton, { backgroundColor: backgroundColor() }]}
			disabled={disabled}
		>
			<View
				style={{
					width: `${count * 33.33}%`,
					height: '100%',
					backgroundColor: '#004F7B'
				}}
			/>
			<View style={styles.startCounterButtonTextContainer}>
				<Text style={styles.startCounterButtonText}>{title}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ProgressButton;
