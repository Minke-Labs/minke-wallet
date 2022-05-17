import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useLanguage } from '@hooks';
import TokenInputInner from '../TokenInputInner/TokenInputInner';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';
import { TokenAmountInputProps } from './TokenAmountInput.types';
import styles from './TokenAmountInput.styles';
import { useTokenAmountInput } from './TokenAmountInput.hooks';

const TokenAmountInput: React.FC<TokenAmountInputProps> = ({
	symbol,
	amount,
	isAmountValid = true,
	placeholder,
	autoFocus = false,
	onAmountChange,
	onNumberAmountChange,
	onMaxPress,
	onTypeChange
}) => {
	const { onChangeText, showSymbol, setShowSymbol } = useTokenAmountInput({
		amount,
		onAmountChange,
		onNumberAmountChange,
		onTypeChange
	});
	const { i18n } = useLanguage();
	return (
		<View style={styles.container}>
			<TokenInputInner
				{...{
					symbol,
					amount,
					isAmountValid,
					placeholder,
					autoFocus,
					showSymbol,
					onChangeText
				}}
			/>

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
