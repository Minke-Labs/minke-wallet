import React from 'react';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Text } from '@components';
import { styles } from './ProgressButton.styles';
import { ProgressButtonProps } from './ProgressButton.types';
import { useProgressButton } from './ProgressButton.hooks';

const ProgressButton: React.FC<ProgressButtonProps> = ({ onFinish, title = 'Hold to Confirm', disabled = false }) => {
	const { count, backgroundColor, startCounter, stopCounter, finishCounter } = useProgressButton({
		onFinish,
		disabled
	});
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
