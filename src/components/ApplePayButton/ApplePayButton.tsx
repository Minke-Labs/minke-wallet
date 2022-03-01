import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
// import { useTheme } from '@hooks';
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
}

const ApplePayButton: React.FC<ApplePayButtonProps> = ({ onPress, marginBottom }) => (
	// const { colors } = useTheme();
	<TouchableOpacity
		onPress={onPress}
		activeOpacity={0.6}
		style={[
			styles.container,
			{
				backgroundColor: '#000000',
				marginBottom
			}
		]}
	>
		<Text color="text11" weight="medium">
			Pay with{' '}
			<Text color="text11" weight="extraBold">
				 Pay
			</Text>
		</Text>
	</TouchableOpacity>
);
export default ApplePayButton;
