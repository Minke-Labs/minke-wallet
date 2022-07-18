import React from 'react';
import { View } from 'react-native';
import { CountrySelector } from '@components';

const CountryModal = () => (
	<View>
		<CountrySelector limitHeight />
	</View>
);

export default CountryModal;
