import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@hooks';
import Text from '../Text/Text';
import styles from './TokenInputInner.styles';
import { TokenInputInnerProps } from './TokenInputInner.types';

const TokenInputInner: React.FC<TokenInputInnerProps> = ({
	symbol,
	amount,
	isAmountValid,
	placeholder,
	autoFocus,
	showSymbol,
	onChangeText,
	marginBottom = 0
}) => {
	const { colors } = useTheme();

	return (
		<View style={
			[
				styles.container,
				{
					borderBottomColor: isAmountValid ? colors.cta2 : colors.alert1,
					marginBottom
				}
			]
		}
		>
			<TextInput
				keyboardType="numeric"
				style={[styles.input, { color: colors.text1 }]}
				value={amount}
				placeholder={placeholder}
				onChangeText={(text) => onChangeText!(text)}
				autoFocus={autoFocus}
			/>
			<Text type="a" weight="bold">
				{showSymbol ? symbol : 'USD'}
			</Text>
		</View>
	);
};

export default TokenInputInner;
