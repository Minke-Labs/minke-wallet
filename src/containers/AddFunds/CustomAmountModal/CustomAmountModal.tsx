import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, ApplePayButton, Icon } from '@components';
import { decimalSeparator as separator, digitGroupingSeparator as delimiter } from 'expo-localization';
import CurrencyInput from 'react-native-currency-input';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useTheme, useLanguage } from '@hooks';
import { makeStyles } from './CustomAmountModal.styles';
import { CustomAmountModalProps } from './CustomAmountModal.types';
import { MIN_PURCHASE, MAX_PURCHASE } from './CustomAmountModal.utils';

const CustomAmountModal: React.FC<CustomAmountModalProps> = ({
	customAmount,
	setCustomAmount,
	customAmountRef,
	onPurchase
}) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	const validAmount = customAmount! >= MIN_PURCHASE && customAmount! <= MAX_PURCHASE;
	const { i18n } = useLanguage();
	return (
		<>
			<Text weight="extraBold" type="h3">
				{i18n.t('Containers.AddFunds.CustomAmountModal.choose_another_amount', {
					min: MIN_PURCHASE,
					max: MAX_PURCHASE
				})}
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
					{i18n.t('Containers.AddFunds.CustomAmountModal.use_a_debit_card')}
				</Text>
			</TouchableOpacity>

			<KeyboardSpacer />
		</>
	);
};

export default CustomAmountModal;
