import { useTheme } from '@hooks';
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
	View,
	Animated as ReactAnimated,
	TextInput,
	Text,
	TextStyle,
	TouchableWithoutFeedback,
	LayoutChangeEvent
} from 'react-native';
import Animated, { EasingNode, timing, interpolateColors } from 'react-native-reanimated';
import ComponentsView from '@src/components/View/View';
import Icon from '@src/components/Icon/Icon';
import Touchable from '@src/components/Touchable/Touchable';
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
		error,
		small,
		value = '',
		onSelectionChange,
		mb,
		style,
		...rest
	},
	ref
) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors, small!);

	const [halfTop, setHalfTop] = useState(0);
	const [isFocusedState, setIsFocused] = useState(false);
	const [secureText, setSecureText] = useState(true);
	const inputRef = useRef<any>(null);

	const [fontColorAnimated] = useState(new Animated.Value(0));
	const [fontSizeAnimated] = useState(new Animated.Value(isFocused ? 12 : 16));
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
				toValue: -halfTop + (isFocusedState ? 16 : 14),
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

	const labelStyle: TextStyle = {
		// @ts-ignore
		color: interpolateColors(fontColorAnimated, {
			inputRange: [0, 1],
			outputColorRange: [colors.text4, colors.cta1]
		})
	};

	const onChangeTextCallback = (val: string) => (onChangeText ? onChangeText(val) : false);

	const onLayout = (event: LayoutChangeEvent) => {
		const { height } = event.nativeEvent.layout;
		setHalfTop(height / 2);
	};

	return (
		<ComponentsView mb={mb}>
			<TouchableWithoutFeedback onPress={setFocus} onLayout={onLayout}>
				<View style={{ flexDirection: 'row', ...(style as object) }}>
					<Animated.View
						style={[
							{
								borderColor: error ? colors.alert1 : isFocusedState ? colors.cta1 : colors.cta2
							},
							styles.container
						]}
					>
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								alignItems: 'center'
							}}
						>
							{!small && (
								<AnimatedText
									onPress={setFocus}
									style={[
										labelStyle,
										styles.label,
										{
											fontSize: fontSizeAnimated,
											transform: [{ translateX: leftAnimated }, { translateY: topAnimated }]
										}
									]}
								>
									{label}
								</AnimatedText>
							)}

							<TextInput
								onSubmitEditing={onSubmitEditing}
								secureTextEntry={isPassword !== undefined ? isPassword && secureText : false}
								onFocus={onFocus !== undefined ? onFocus : handleFocus}
								onBlur={onBlur !== undefined ? onBlur : handleBlur}
								ref={inputRef}
								onChangeText={onChangeTextCallback}
								style={styles.input}
								{...{ value, multiline, ...rest }}
							/>

							{error && <Icon name="errorStroke" size={24} color="alert1" style={{ marginRight: 8 }} />}

							{isPassword && (
								<Touchable style={styles.toggleButton} onPress={() => toggleVisibility()}>
									{secureText ? (
										<Icon name="eyeCross" size={24} color="cta1" />
									) : (
										<Icon name="eyeStroke" size={24} color="cta1" />
									)}
								</Touchable>
							)}
						</View>
					</Animated.View>
				</View>
			</TouchableWithoutFeedback>
		</ComponentsView>
	);
};

export default forwardRef(Input);
