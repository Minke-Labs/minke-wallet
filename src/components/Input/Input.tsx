import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Animated, Text } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFCF5',
		borderRadius: 41,
		width: 208,
		height: 56,
		borderColor: '#D0D0D0',
		borderWidth: 1
	},
	input: {
		fontSize: 16,
		height: 35,
		color: '#05222D',
		borderWidth: 1,
		borderColor: 'red',
		flex: 1,
		paddingLeft: 24
	},
	label: {
		color: '#748190',
		fontSize: 16,
		lineHeight: 16,
		fontFamily: 'Inter_400Regular'
	},
	animatedStyle: {
		top: 19,
		left: 15,
		position: 'absolute',
		borderRadius: 90,
		zIndex: 10000
	}
});

const TestScreen = () => {
	const [value, setValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const moveText = useRef(new Animated.Value(0)).current;

	const onChangeText = (text: string) => {
		setValue(text);
	};

	const moveTextTop = () => {
		Animated.timing(moveText, {
			toValue: 1,
			duration: 100,
			useNativeDriver: true
		}).start();
	};

	const moveTextBottom = () => {
		Animated.timing(moveText, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true
		}).start();
	};

	const yVal = moveText.interpolate({
		inputRange: [0, 1],
		outputRange: [0, -18]
	});

	const animStyle = {
		transform: [{ translateY: yVal }]
	};

	const onFocusHandler = () => {
		setIsFocused(true);
		moveTextTop();
	};

	const onBlurHandler = () => {
		if (value === '') {
			moveTextBottom();
			setIsFocused(false);
		}
	};

	useEffect(() => {
		if (value !== '') {
			moveTextTop();
		} else if (value === '') {
			moveTextBottom();
		}
	}, [value]);

	return (
		<View style={[styles.container, { borderColor: isFocused ? '#006AA6' : '#D0D0D0' }]}>
			<Animated.View style={[styles.animatedStyle, animStyle]}>
				<Text
					style={[
						styles.label,
						{
							color: isFocused ? '#006AA6' : '#748190',
							fontSize: isFocused ? 12 : 16
						}
					]}
				>
					Label
				</Text>
			</Animated.View>
			<TextInput
				autoCapitalize="none"
				style={styles.input}
				value={value}
				onChangeText={(text: string) => onChangeText(text)}
				editable
				onFocus={onFocusHandler}
				onBlur={onBlurHandler}
				blurOnSubmit
			/>
		</View>
	);
};
export default TestScreen;
