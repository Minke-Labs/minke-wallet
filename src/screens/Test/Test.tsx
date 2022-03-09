import React, { useState } from 'react';
import { View } from 'react-native';
import { Input } from '@components';
import { WelcomeLayout } from '@layouts';

const Test = () => {
	const [value, setValue] = useState('');
	return (
		<WelcomeLayout>
			<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
				<Input
					label="Label"
					value={value}
					onChangeText={setValue}
					isPassword
				/>
			</View>
		</WelcomeLayout>
	);
};

export default Test;
