import React, { RefObject } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { Text, ApplePayButton, Icon } from '@components';
import { decimalSeparator as separator, digitGroupingSeparator as delimiter } from 'expo-localization';
import CurrencyInput from 'react-native-currency-input';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useTheme } from '@hooks';
import { makeStyles } from './CustomAmountModal.styles';

interface CustomAmountModalProps {
	setCustomAmount: (value: number | null) => void;
	customAmount: number | null;
	customAmountRef: RefObject<TextInput>;
	onPurchase: () => void;
}

const MIN_PURCHASE = __DEV__ ? 0.1 : 100;
const MAX_PURCHASE = 500;

const CustomAmountModal: React.FC<CustomAmountModalProps> = ({
	customAmount,
	setCustomAmount,
	customAmountRef,
	onPurchase
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const validAmount = customAmount! >= MIN_PURCHASE && customAmount! <= MAX_PURCHASE;

	return (
		<>
			<Text weight="extraBold" type="h3">
				Choose other amount between ${MIN_PURCHASE} and ${MAX_PURCHASE}
			</Text>

			<CurrencyInput
				value={customAmount}
				onChangeValue={setCustomAmount}
				prefix="$"
				delimiter={delimiter}
				separator={separator}
				precision={2}
				maxValue={500}
				ref={customAmountRef}
				autoFocus
				placeholder="$00.00"
				style={[styles.currencyInput, customAmount && !validAmount ? { borderBottomColor: colors.alert1 } : {}]}
			/>

			<ApplePayButton marginBottom={12} onPress={onPurchase} disabled={!validAmount} />
			<TouchableOpacity activeOpacity={0.6} style={styles.hintBellowButton}>
				<Icon name="infoStroke" size={14} color="text2" style={{ marginRight: 4 }} />
				<Text type="a" color="text2">
					Use a debit card
				</Text>
			</TouchableOpacity>

			<KeyboardSpacer />
		</>
	);
};

export default CustomAmountModal;
