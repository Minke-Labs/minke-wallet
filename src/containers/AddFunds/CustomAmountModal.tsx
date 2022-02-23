import React, { RefObject } from 'react';
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Text, ApplePayButton, Icon } from '@components';
import CurrencyInput from 'react-native-currency-input';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const styles = StyleSheet.create({
	currencyInput: {
		borderBottomColor: '#000000',
		borderBottomWidth: 1,
		paddingBottom: 8,
		fontSize: 32,
		marginTop: 16,
		marginBottom: 24
	},
	hintBellowButton: {
		textAlign: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

interface CustomAmountModalProps {
	setCustomAmount: (value: number | null) => void;
	customAmount: number | null;
	customAmountRef: RefObject<TextInput>;
}

const CustomAmountModal: React.FC<CustomAmountModalProps> = ({ customAmount, setCustomAmount, customAmountRef }) => (
	<>
		<Text weight="extraBold" type="h3">
			Choose other amount
		</Text>

		<CurrencyInput
			value={customAmount}
			onChangeValue={setCustomAmount}
			prefix="$"
			delimiter=","
			separator="."
			precision={2}
			minValue={0}
			ref={customAmountRef}
			autoFocus
			placeholder="$00.00"
			style={styles.currencyInput}
		/>

		<ApplePayButton marginBottom={12} />
		<TouchableOpacity activeOpacity={0.6} style={styles.hintBellowButton}>
			<Icon name="infoStroke" size={14} color="text2" style={{ marginRight: 4 }} />
			<Text type="a" color="text2">Use a debit card</Text>
		</TouchableOpacity>

		<KeyboardSpacer />
	</>
);

export default CustomAmountModal;
