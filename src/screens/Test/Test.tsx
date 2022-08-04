import React, { useState } from 'react';
import { View } from 'react-native';
import { TelephoneInput } from '@components';
import { BasicLayout } from '@layouts';

const Test = () => {
	const [text, setText] = useState('');
	return (
		<BasicLayout>
			<View style={{ paddingTop: 156, paddingHorizontal: 16 }}>
				<TelephoneInput
					label="Mobile number"
					value={text}
					onChangeText={(t) => setText(t)}
					// error
				/>
			</View>
		</BasicLayout>
	);
};

export default Test;
