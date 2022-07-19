import React from 'react';
import { View } from 'react-native';
import { CountrySelector } from '@components';

const CountryModal = () => (
	<View>
		<CountrySelector limitHeight desc />
	</View>
);

export default CountryModal;
