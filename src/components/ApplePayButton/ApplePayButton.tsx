import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import Text from '../Text/Text';

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
			<Text color="text11" weight="medium">
				{i18n.t('Components.Buttons.pay_with')}
				<Text color="text11" weight="extraBold">
					 Pay
				</Text>
			</Text>
		</TouchableOpacity>
	);
};

export default ApplePayButton;
