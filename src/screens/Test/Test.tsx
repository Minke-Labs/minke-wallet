/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View } from 'react-native';
import { TelephoneInput } from '@components';
import { BasicLayout } from '@layouts';

type AreaObjType = 'US' | 'AU' | 'BR';

const Test = () => {
	const [iso, setIso] = useState<AreaObjType>('US');
	const [visible, setVisible] = useState(false);
	const [text, setText] = useState('');
	return (
		<>
			<BasicLayout>
				<View style={{ paddingTop: 156, paddingHorizontal: 16 }}>
					<TelephoneInput.Input
						label="Mobile number"
						value={text}
						onChangeText={(t) => setText(t)}
						openModal={() => setVisible(true)}
					// error
					/>
				</View>
			</BasicLayout>
			<TelephoneInput.Modal
				isVisible={visible}
				onDismiss={() => setVisible(false)}
			/>
		</>
	);
};

export default Test;
