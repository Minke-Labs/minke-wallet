import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@helpers/param-list-type';
import PrimaryButton from '@components/PrimaryButton';

export function SaveScreen({ navigation }: NativeStackScreenProps<RootStackParamList>) {
	const goToExchangeResume = () => {
		navigation.navigate('ExchangeResume');
	};

	return (
		<PrimaryButton onPress={goToExchangeResume} disabled={!canSwap()}>
			Exchange
		</PrimaryButton>
	);
}

export default SaveScreen;
