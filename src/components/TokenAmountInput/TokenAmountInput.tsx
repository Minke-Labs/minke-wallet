import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import { Text, Icon } from '@components';
import { TokenAmountInputProps } from './TokenAmountInput.types';
import styles from './TokenAmountInput.styles';
import { useTokenAmountInput } from './TokenAmountInput.hooks';

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({
	amount,
	symbol,
	onAmountChange,
	onNumberAmountChange,
	innerRef,
	placeholder,
	visible = true,
	isAmountValid = true,
	autoFocus = false
}) => {
	const [toggleSymbol, setToggleSymbol] = useState(false);
	const { colors } = useTheme();
	const { onChangeText } = useTokenAmountInput({ amount, onAmountChange, onNumberAmountChange });

	return (
		<View style={styles.container}>
			<View style={[styles.inputContainer, { borderBottomColor: isAmountValid ? colors.cta2 : colors.alert1 }]}>
				<TextInput
					keyboardType="numeric"
					style={[
						styles.input,
						{
							display: visible ? 'flex' : 'none',
							color: colors.text1
						}
					]}
					value={amount}
					ref={innerRef}
					placeholder={placeholder}
					onChangeText={(text) => onChangeText(text)}
					autoFocus={autoFocus}
				/>
				<Text type="a" weight="bold">
					{!toggleSymbol ? symbol : 'USD'}
				</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity onPress={() => console.log('SEND MAX!')}>
					<Text type="a" weight="medium" color="text7" style={{ marginRight: 12 }}>
						Send max
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.touchable} onPress={() => setToggleSymbol(!toggleSymbol)}>
					<Icon name="tradeStroke" color="text7" size={16} style={{ marginRight: 4 }} />
					<Text type="a" color="text7" weight="medium">
						{toggleSymbol ? symbol : 'USD'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TokenAmountInput;
