import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useTheme, useAuthentication } from '@hooks';
import * as Haptics from 'expo-haptics';

import { styles } from './HapticButton.styles';
import { HapticButtonProps } from './HapticButton.types';
import TouchableShrinks from '../TouchableShrinks/TouchableShrinks';

import Ring from './Ring/Ring';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';

const { showAuthenticationPrompt } = useAuthentication();

const HapticButton: React.FC<HapticButtonProps> = ({ disabled = false, title, marginBottom = 0, onPress }) => {
	const [stage, setStage] = useState(0);
	const { colors } = useTheme();

	const onPressIn = () => {
		setStage(1);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
	};

	const onPressOut = () => {
		Keyboard.dismiss();
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
			<View style={[styles.button, { backgroundColor: disabled ? colors.detail2 : colors.cta1, marginBottom }]}>
				{stage === 0 && (
					<>
						<Icon name="faceIdStroke" size={18} style={{ marginRight: 14 }} color="text11" />
						<Text weight="bold" color="text11">
							{title}
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
