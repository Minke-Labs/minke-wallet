import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import { os } from '@styles';
import Icon from '../Icon/Icon';
import Text from '../Text/Text';
import APay from './APay.svg';
import GPay from './GPay.svg';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		height: 50,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20
	}
});

interface ApplePayButtonProps {
	onPress?: (event: GestureResponderEvent) => void;
	marginBottom?: number;
	disabled?: boolean;
}

const ApplePayButton: React.FC<ApplePayButtonProps> = ({ onPress, marginBottom, disabled = false }) => {
	const { colors } = useTheme();
	const { i18n } = useLanguage();

	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.6}
			style={[
				styles.container,
				{
					backgroundColor: disabled ? colors.detail2 : '#000000',
					marginBottom
				}
			]}
		>
			{ (os === 'android') ? <GPay /> : <APay /> }
			<Text
				color="text11"
				type="lSmall"
				weight="semiBold"
				style={{ marginHorizontal: 8 }}
			>
				-
			</Text>
			<Icon color="text11" size={28} name="card" style={{ marginRight: 4 }} />
			<Text color="text11" weight="semiBold">
				{i18n.t('Components.GenericButton.debit_credit')}
			</Text>
		</TouchableOpacity>
	);
};

export default ApplePayButton;
