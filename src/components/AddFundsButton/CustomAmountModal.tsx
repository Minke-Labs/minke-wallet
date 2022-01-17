import React, { RefObject } from 'react';
import { TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import CurrencyInput from 'react-native-currency-input';
import ApplePayButton from '@components/ApplePayButton';
import { MaterialIcons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal from '@components/Modal';

export const makeStyles = (colors: ReactNativePaper.ThemeColors) =>
	StyleSheet.create({
		modalHeadline: {
			fontSize: 24,
			fontFamily: 'Inter_800ExtraBold'
		},
		currencyInput: {
			borderBottomColor: '#000000',
			borderBottomWidth: 1,
			paddingBottom: 8,
			fontSize: 32,
			marginTop: 16,
			marginBottom: 24
		},
		hintBellowButton: {
			color: '#4F4F4F',
			textAlign: 'center',
			fontSize: 16,
			padding: 16,
			flexDirection: 'row',
			justifyContent: 'center',
			alignContent: 'center',
			alignItems: 'center'
		},
		hintBellowButtonText: {
			marginLeft: 8
		}
	});

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
	setCustomAmount: Function;
	customAmount: number | null;
	customAmountRef: RefObject<TextInput>;
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);

	return (
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
};

export default CustomAmountModal;
