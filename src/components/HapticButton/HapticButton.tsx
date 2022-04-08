import React from 'react';
import { useTheme } from '@hooks';
import { View } from 'react-native';

import { styles } from './HapticButton.styles';
import { HapticButtonProps } from './HapticButton.types';
import TouchableShrinks from '../TouchableShrinks/TouchableShrinks';

import Text from '../Text/Text';
import Icon from '../Icon/Icon';

const HapticButton: React.FC<HapticButtonProps> = ({
	iconLeft = true,
	disabled = false,
	marginBottom = 0,
	onPress
}) => {
	const { colors } = useTheme();

	return (
		<TouchableShrinks {...{ disabled, onPress, marginBottom }}>
			<View style={[styles.button, { backgroundColor: colors.cta1, marginBottom }]} {...{ disabled }}>
				{iconLeft && <Icon name="crossHairStroke" size={18} style={{ marginRight: 14 }} color="text11" />}
				<Text weight="medium" color="text11">
					Hold to Deposit
				</Text>
			</View>
		</TouchableShrinks>
	);
};

export default HapticButton;
