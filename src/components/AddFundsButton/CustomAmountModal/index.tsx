import React, { RefObject } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import ApplePayButton from '@components/ApplePayButton';
import { MaterialIcons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal from '@components/Modal';
import styles from './styles';

const CustomAmountModal = ({
	visible,
	onDismiss,
	onCloseAll,
	onBack,
	customAmount,
	setCustomAmount,
	customAmountRef
}: {
	visible: boolean;
	onDismiss: () => void;
	onCloseAll: () => void;
	onBack: () => void;
	setCustomAmount: (value: number | null) => void;
	customAmount: number | null;
	customAmountRef: RefObject<TextInput>;
}) => (
	<Modal visible={visible} onDismiss={onDismiss} onBack={onBack} onCloseAll={onCloseAll}>
		<>
			<Text style={styles.modalHeadline}>Choose other amount</Text>

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

			<ApplePayButton />
			<TouchableOpacity style={styles.hintBellowButton}>
				<MaterialIcons name="error-outline" size={20} color="#4F4F4F" />
				<Text style={styles.hintBellowButtonText}>Use a debit card</Text>
			</TouchableOpacity>

			<KeyboardSpacer />
		</>
	</Modal>
);

export default CustomAmountModal;
