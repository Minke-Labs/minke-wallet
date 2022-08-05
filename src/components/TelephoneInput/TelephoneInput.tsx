/* eslint-disable react/jsx-props-no-spreading */
import { useTheme } from '@hooks';
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
	View,
	Animated as ReactAnimated,
	TextInput,
	TextStyle,
	Text as NativeText,
	TouchableWithoutFeedback,
	LayoutChangeEvent
} from 'react-native';
import Animated, { EasingNode, timing, interpolateColors } from 'react-native-reanimated';
import Icon from '../Icon/Icon';
import Flag from '../Flag/Flag';
import Text from '../Text/Text';
import { makeStyles } from './TelephoneInput.styles';
import { InputProps, InputRef } from './TelephoneInput.types';

const HEIGHT = 56;

const AnimatedText = Animated.createAnimatedComponent(NativeText);

const TelephoneInput: React.ForwardRefRenderFunction<InputRef, InputProps> = (
	{
		label,
		onSubmit,
		isFocused,
		multiline,
		error,
		style,
		onChangeText,
		onBlur,
		onFocus,
		value = '',
		...rest
	},
	ref
) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors, HEIGHT);

	const [halfTop, setHalfTop] = useState(0);
	const [isFocusedState, setIsFocused] = useState(false);
	const inputRef = useRef<any>(null);

	const [fontColorAnimated] = useState(new Animated.Value(0));
	const [fontSizeAnimated] = useState(new Animated.Value(isFocused ? 12 : 16));
	const [leftAnimated] = useState(new Animated.Value(0));
	const [topAnimated] = useState(new Animated.Value(0));
	const [flagAnimated] = useState(new Animated.Value(0));

	const setFocus = () => inputRef.current?.focus();

	const animateFocus = () => {
		ReactAnimated.parallel([
			// @ts-ignore
			timing(leftAnimated, {
				duration: 300,
				easing: EasingNode.linear,
				toValue: -62
			}),
			// @ts-ignore
			timing(fontSizeAnimated, {
				toValue: 10,
				duration: 300,
				easing: EasingNode.linear
			}),
			// @ts-ignore
			timing(topAnimated, {
				toValue: -halfTop + (isFocusedState ? 6 : 14),
				duration: 300,
				easing: EasingNode.linear
			}),
			// @ts-ignore
			timing(flagAnimated, {
				toValue: 8,
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
			timing(flagAnimated, {
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
			outputColorRange: [colors.text4, error ? colors.alert1 : colors.cta1]
		})
	};

	const onLayout = (event: LayoutChangeEvent) => {
		const { height } = event.nativeEvent.layout;
		setHalfTop(height / 2);
	};

	return (
		<View style={{ flexDirection: 'row', ...(style as object) }}>
			<View
				style={[
					{
						borderColor: error ?
							colors.alert1 :
							isFocusedState ?
								colors.cta1 :
								colors.cta2
					},
					styles.container
				]}
			>
				<View style={{ flexDirection: 'row' }}>

					<Animated.View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							transform: [{ translateY: flagAnimated }]
						}}
					>
						<Flag name="unitedStates" size={24} />
						<Text type="bMedium" color="text4" style={{ marginLeft: 4 }}>
							(+1)
						</Text>
					</Animated.View>

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

					<TouchableWithoutFeedback onPress={setFocus} onLayout={onLayout}>
						<TextInput
							onSubmitEditing={onSubmitEditing}
							onFocus={onFocus !== undefined ? onFocus : handleFocus}
							onBlur={onBlur !== undefined ? onBlur : handleBlur}
							ref={inputRef}
							onChangeText={(val: string) => onChangeText?.(val)}
							style={styles.input}
							{...{ value, multiline, ...rest }}
						/>
					</TouchableWithoutFeedback>

				</View>

				{error && (
					<View
						style={{
							height: HEIGHT,
							position: 'absolute',
							right: 16,
							justifyContent: 'center'
						}}
					>
						<Icon
							name="errorStroke"
							size={24}
							color="alert1"
						/>
					</View>
				)}

			</View>
		</View>
	);
};

export default forwardRef(TelephoneInput);
