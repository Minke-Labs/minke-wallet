import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useLocation, useLanguage } from '@hooks';
import styles from './OnrampButton.styles';
import { chooseLocation } from './OnrampButton.utils';
import { OnrampButtonProps } from './OnrampButton.types';

const OnrampButton: React.FC<OnrampButtonProps> = ({ onPress, marginBottom = 0, disabled = false }) => {
	const { countryCode } = useLocation();
	const { i18n } = useLanguage();

	if (!chooseLocation(countryCode!)) return null;

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[
				styles.container,
				{
					backgroundColor: chooseLocation(countryCode!)?.backgroundColor,
					marginBottom
				}
			]}
			{...{ onPress, disabled }}
		>
			<Text
				style={[
					styles.text,
					{ color: chooseLocation(countryCode!)?.fontColor }
				]}
			>
				{i18n.t('Components.Buttons.pay_with')}
			</Text>
			<Image source={chooseLocation(countryCode!)?.image} style={styles.image} />
		</TouchableOpacity>
	);
};

export default OnrampButton;
