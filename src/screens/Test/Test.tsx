import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from '@components';
import { WelcomeLayout } from '@layouts';

const Test = () => {
	const [value, setValue] = useState('');
	return (
		<WelcomeLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Input label="label" value={value} onChangeText={setValue} small error isPassword />
			</View>
		</WelcomeLayout>
	);
};

export default Test;
