/* eslint-disable react/jsx-props-no-spreading */
import { useTheme } from '@hooks';
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
	View,
	Animated as ReactAnimated,
	TextInput,
	Text,
	TouchableOpacity,
	TextStyle,
	TouchableWithoutFeedback,
	LayoutChangeEvent
} from 'react-native';
import Animated, { EasingNode, timing, interpolateColors } from 'react-native-reanimated';
import Icon from '../Icon/Icon';
import { makeStyles } from './Input.styles';
import { InputProps, InputRef } from './Input.types';

const AnimatedText = Animated.createAnimatedComponent(Text);

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
	{
		label,
		isPassword,
		onChangeText,
		isFocused,
		onBlur,
		onFocus,
		onTogglePassword,
		togglePassword,
		placeholder,
		onSubmit,
		multiline,
		value = '',
		onSelectionChange,
		...rest
	},
	ref
) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	const [halfTop, setHalfTop] = useState(0);
	const [isFocusedState, setIsFocused] = useState(false);
	const [secureText, setSecureText] = useState(true);
	const inputRef = useRef<any>(null);

	const [fontColorAnimated] = useState(new Animated.Value(0));
	const [fontSizeAnimated] = useState(new Animated.Value(isFocused ? 10 : 14));
	const [leftAnimated] = useState(new Animated.Value(0));
	const [topAnimated] = useState(new Animated.Value(0));

	const setFocus = () => inputRef.current?.focus();
	const setBlur = () => inputRef.current?.blur();

	const toggleVisibility = (toggle?: boolean) => {
		if (toggle === undefined) {
			if (onTogglePassword) {
				onTogglePassword(!secureText);
			}
			setSecureText(!secureText);
			if (secureText) setFocus();
			else setBlur();
		} else if (!((secureText && !toggle) || (!secureText && toggle))) {
			if (onTogglePassword) {
				onTogglePassword(!toggle);
			}
			setSecureText(!toggle);
			if (toggle) setFocus();
			else setBlur();
		}
	};

	const animateFocus = () => {
		ReactAnimated.parallel([
			// @ts-ignore
			timing(leftAnimated, {
				duration: 300,
				easing: EasingNode.linear,
				toValue: 0
			}),
			// @ts-ignore
			timing(fontSizeAnimated, {
				toValue: 10,
				duration: 300,
				easing: EasingNode.linear
			}),
			// @ts-ignore
			timing(topAnimated, {
				toValue: -halfTop + (isFocusedState ? 10 : 14),
				duration: 300,
				easing: EasingNode.linear
			}),
			// @ts-ignore
			timing(fontColorAnimated, {
				toValue: 1,
				duration: 300,
				easing: EasingNode.linear
			})
		]).start();
	};

	const animateBlur = () => {
		ReactAnimated.parallel([
			// @ts-ignore
			timing(leftAnimated, {
				duration: 300,
				easing: EasingNode.linear,
				toValue: 0
			}),
			// @ts-ignore
			timing(fontSizeAnimated, {
				toValue: 14,
				duration: 300,
				easing: EasingNode.linear
			}),
			// @ts-ignore
			timing(topAnimated, {
				toValue: 0,
				duration: 300,
				easing: EasingNode.linear
			}),
			// @ts-ignore
			timing(fontColorAnimated, {
				toValue: 0,
				duration: 300,
				easing: EasingNode.linear
			})
		]).start();
	};

	useEffect(() => {
		if (isFocused === undefined) {
			if (value !== '' || isFocusedState) {
				setIsFocused(true);
			} else if (value === '' || value === null) {
				setIsFocused(false);
			}
		}
	}, [value]);

	useEffect(() => {
		if (isFocused !== undefined) {
			if (value !== '' || isFocused) {
				setIsFocused(true);
			} else {
				setIsFocused(false);
			}
		}
	}, [isFocused, value]);

	useEffect(() => {
		if (togglePassword !== undefined) {
			toggleVisibility(togglePassword);
		}
	}, [togglePassword]);

	useEffect(() => {
		if (isFocusedState || value !== '') {
			if (halfTop !== 0) {
				animateFocus();
			}
		} else {
			animateBlur();
		}
	}, [isFocusedState]);

	useImperativeHandle(ref, () => ({
		focus() {
			inputRef.current.focus();
		},
		blur() {
			inputRef.current.blur();
		}
	}));

	useEffect(() => {
		if (isFocusedState) {
			ReactAnimated.parallel([
				// @ts-ignore
				timing(leftAnimated, {
					duration: 300,
					easing: EasingNode.linear,
					toValue: 0
				}),
				// @ts-ignore
				timing(fontSizeAnimated, {
					toValue: 10,
					duration: 300,
					easing: EasingNode.linear
				}),
				// @ts-ignore
				timing(topAnimated, {
					toValue: -halfTop + (isFocusedState ? 10 : 14),
					duration: 300,
					easing: EasingNode.linear
				}),
				// @ts-ignore
				timing(fontColorAnimated, {
					toValue: 1,
					duration: 300,
					easing: EasingNode.linear
				})
			]).start();
		}
	}, [halfTop]);

	const handleFocus = () => setIsFocused(true);

	const handleBlur = () => {
		if (value === '') {
			setIsFocused(false);
		}
	};

	const onSubmitEditing = () => {
		if (onSubmit !== undefined) onSubmit();
	};

	const newLabelStyles = {
		fontSizeFocused: 10,
		fontSizeBlurred: 14,
		colorFocused: '#49658c',
		colorBlurred: '#49658c'
	};

	const labelStyle: TextStyle = {
		left: 5,
		fontSize: !isFocusedState ? newLabelStyles.fontSizeBlurred : newLabelStyles.fontSizeFocused,
		// @ts-ignore
		color: interpolateColors(fontColorAnimated, {
			inputRange: [0, 1],
			outputColorRange: [colors.text4, colors.cta1]
		}),
		alignSelf: 'center',
		position: 'absolute',
		flex: 1
	};

	const onChangeTextCallback = (val: string) => (onChangeText ? onChangeText(val) : false);

	const onLayout = (event: LayoutChangeEvent) => {
		const { height } = event.nativeEvent.layout;
		setHalfTop(height / 2);
	};

	return (
		<TouchableWithoutFeedback onPress={setFocus} onLayout={onLayout}>
			<View style={{ flexDirection: 'row' }}>
				<View
					style={[styles.container, { zIndex: 999 }]}
				>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<AnimatedText
							onPress={setFocus}
							style={[
								labelStyle,
								{
									fontSize: fontSizeAnimated,
									transform: [{ translateX: leftAnimated }, { translateY: topAnimated }]
								}
							]}
						>
							{label}
						</AnimatedText>

						<TextInput
							onSubmitEditing={onSubmitEditing}
							secureTextEntry={isPassword !== undefined ? isPassword && secureText : false}
							onFocus={onFocus !== undefined ? onFocus : handleFocus}
							onBlur={onBlur !== undefined ? onBlur : handleBlur}
							ref={inputRef}
							onChangeText={onChangeTextCallback}
							style={[
								styles.input,
								{
									flex: 1,
									color:
										styles.input.color !== undefined ?
											styles.input.color :
											newLabelStyles.colorFocused,
									zIndex: 999
								}
							]}
							{...{ value, multiline, ...rest }}
						/>

						{isPassword && (
							<TouchableOpacity style={styles.toggleButton} onPress={() => toggleVisibility()}>
								{secureText ? (
									<Icon name="eyeCross" size={24} color="cta1" />
								) : (
									<Icon name="eyeStroke" size={24} color="cta1" />
								)}
							</TouchableOpacity>
						)}
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default forwardRef(Input);
