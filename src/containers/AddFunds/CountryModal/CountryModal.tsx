import React from 'react';
import { View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { CountrySelector } from '@components';

const CountryModal = ({ onCountrySelected }: { onCountrySelected?: () => void }) => (
	<View>
		<CountrySelector limitHeight desc onCountrySelected={onCountrySelected} />
		<KeyboardSpacer />
	</View>
);

export default CountryModal;
