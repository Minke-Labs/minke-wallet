/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useTheme, useAuthentication } from '@hooks';
import { View } from 'react-native';

import { styles } from './HapticButton.styles';
import { HapticButtonProps } from './HapticButton.types';
import TouchableShrinks from '../TouchableShrinks/TouchableShrinks';

import Ring from './Ring/Ring';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';

const { showAuthenticationPrompt } = useAuthentication();

const HapticButton: React.FC<HapticButtonProps> = ({ disabled = false, marginBottom = 0, onPress }) => {
	const [stage, setStage] = useState(0);
	const { colors } = useTheme();

	const onPressIn = () => {
		setStage(1);
	};

	const onPressOut = () => {
		showAuthenticationPrompt({
			onSuccess: () => {
				onPress();
				setStage(0);
			}
		});
	};

	return (
		<TouchableShrinks
			{...{
				disabled,
				onPressIn,
				onPressOut,
				marginBottom
			}}
		>
			<View style={[styles.button, { backgroundColor: colors.cta1, marginBottom }]}>
				{stage === 0 && (
					<>
						<Icon name="crossHairStroke" size={18} style={{ marginRight: 14 }} color="text11" />
						<Text weight="bold" color="text11">
							Hold to Deposit
						</Text>
					</>
				)}

				{stage === 1 && (
					<>
						<Ring />
						<Text weight="bold" color="text11" style={{ marginLeft: 14 }}>
							Authorizing...
						</Text>
					</>
				)}
			</View>
		</TouchableShrinks>
	);
};

export default HapticButton;
