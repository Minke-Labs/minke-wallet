import React from 'react';
import { View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { CountrySelector } from '@components';

const CountryModal = () => (
	<View>
		<CountrySelector limitHeight desc />
		<KeyboardSpacer />
	</View>
);

export default CountryModal;
