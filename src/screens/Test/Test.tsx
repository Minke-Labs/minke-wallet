import { View, SafeAreaView } from 'react-native';
import React from 'react';
import { Token } from '@components';

const Test = () => (
	<SafeAreaView>
		<View style={{ marginBottom: 160 }} />
		<Token name="zil" />
	</SafeAreaView>
);

export default Test;
