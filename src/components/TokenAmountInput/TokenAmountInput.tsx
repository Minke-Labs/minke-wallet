import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { useTheme } from '@hooks';
import i18n from '@localization';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
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
	onMaxPress,
	onTypeChange,
	visible = true,
	isAmountValid = true,
	autoFocus = false
}) => {
	const { colors } = useTheme();
	const { onChangeText, showSymbol, setShowSymbol } = useTokenAmountInput({
		amount,
		onAmountChange,
		onNumberAmountChange,
		onTypeChange
	});

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
					{showSymbol ? symbol : 'USD'}
				</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity onPress={() => !!onMaxPress && onMaxPress(showSymbol)}>
					<Text type="a" weight="medium" color="text7" style={{ marginRight: 12 }}>
						{i18n.t('Components.TokenAmountInput.send_max')}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.touchable} onPress={() => setShowSymbol(!showSymbol)}>
					<Icon name="tradeStroke" color="text7" size={16} style={{ marginRight: 4 }} />
					<Text type="a" color="text7" weight="medium">
						{!showSymbol ? symbol : 'USD'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TokenAmountInput;
