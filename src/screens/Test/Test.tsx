import React from 'react';
import { View } from 'react-native';
import { Token } from '@components';
import { WelcomeLayout } from '@layouts';

const Test = () => (
	<WelcomeLayout>
		<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
			<Token name="gala" />
		</View>
	</WelcomeLayout>
);

export default Test;
