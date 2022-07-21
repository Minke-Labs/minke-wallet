import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useCountry, useLanguage } from '@hooks';
import styles from './OnrampButton.styles';
import { chooseLocation } from './OnrampButton.utils';
import { OnrampButtonProps } from './OnrampButton.types';

const OnrampButton: React.FC<OnrampButtonProps> = ({ onPress, marginBottom = 0, disabled = false }) => {
	const { country } = useCountry();
	const { i18n } = useLanguage();
	const location = chooseLocation(country);
	if (!location) return null;
	const { locStyles, image: Image } = location;
	const { backgroundColor, fontColor } = locStyles;
	return (
		<TouchableOpacity
			activeOpacity={0.6}
			style={[styles.container, { backgroundColor, marginBottom }]}
			{...{ onPress, disabled }}
		>
			<Text style={[styles.text, { color: fontColor }]}>{i18n.t('Components.Buttons.pay_with')}</Text>
			<Image />
		</TouchableOpacity>
	);
};

export default OnrampButton;
