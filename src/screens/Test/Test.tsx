import React, { useState } from 'react';
import { View } from 'react-native';
import { TelephoneInput } from '@components';
import { BasicLayout } from '@layouts';
import { AreaObjType } from '../../components/TelephoneInput/TelephoneInput.types';

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
						iso={iso}
						// error
					/>
				</View>
			</BasicLayout>
			<TelephoneInput.Modal
				setValue={(val: AreaObjType) => setIso(val)}
				isVisible={visible}
				onDismiss={() => setVisible(false)}
			/>
		</>
	);
};

export default Test;
