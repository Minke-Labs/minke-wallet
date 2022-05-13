import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { useLocation, useLanguage } from '@hooks';
import styles from './OnrampButton.styles';
import { chooseLocation } from './OnrampButton.utils';
import { OnrampButtonProps } from './OnrampButton.types';

const OnrampButton: React.FC<OnrampButtonProps> = ({ onPress, marginBottom = 0, disabled = false }) => {
	const { countryCode } = useLocation();
	const { i18n } = useLanguage();
	const location = chooseLocation(countryCode!);
	if (!location) return null;

	const { backgroundColor, fontColor, image } = location;
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[
				styles.container,
				{
					backgroundColor,
					marginBottom
				}
			]}
			{...{ onPress, disabled }}
		>
			<Text style={[styles.text, { color: fontColor }]}>{i18n.t('Components.Buttons.pay_with')}</Text>
			<Image source={image} style={styles.image} />
		</TouchableOpacity>
	);
};

export default OnrampButton;
