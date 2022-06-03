/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@hooks';
import Text from '../Text/Text';
import { makeStyles } from './TokenInputInner.styles';
import { TokenInputInnerProps } from './TokenInputInner.types';

const TokenInputInner: React.FC<TokenInputInnerProps> = ({
	symbol,
	amount,
	isAmountValid,
	placeholder,
	autoFocus,
	showSymbol,
	onChangeText,
	marginBottom = 0,
	ghost = false
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(isAmountValid, ghost, colors);

	return (
		<View style={[styles.container, { marginBottom }]}>
			<TextInput
				keyboardType="numeric"
				style={
					[
						styles.input,
						{
							color: ghost ?
								!isAmountValid ? colors.alert1 : colors.text1
								: colors.text1
						}
					]
				}
				value={amount}
				placeholder={placeholder}
				selectionColor={colors.text7}
				onChangeText={(text) => onChangeText!(text)}
				autoFocus={autoFocus}
			/>
			{
				!ghost && (
					<Text type="a" weight="bold">
						{showSymbol ? symbol : 'USD'}
					</Text>
				)
			}
		</View>
	);
};

export default TokenInputInner;
