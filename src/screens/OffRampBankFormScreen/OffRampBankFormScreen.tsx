import React, { useState } from 'react';
import { View, Header, TelephoneInput } from '@components';
import { BasicLayout } from '@layouts';
import { AreaObjType } from '@src/components/TelephoneInput/TelephoneInput.types';

const OffRampBankFormScreen = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [iso, setIso] = useState<AreaObjType>('US');
	const [text, setText] = useState('');
	return (
		<>
			<BasicLayout>
				<Header
					onLinkClick={() => null}
					title="Personal information"
					link="Next"
					mb="m"
				/>
				<View ph="xs">

					<TelephoneInput.Input
						label="Mobile number"
						value={text}
						onChangeText={(t) => setText(t)}
						openModal={() => setModalVisible(true)}
						iso={iso}
					// error
					/>

				</View>
			</BasicLayout>

			<TelephoneInput.Modal
				setValue={(val: AreaObjType) => setIso(val)}
				isVisible={modalVisible}
				onDismiss={() => setModalVisible(false)}
			/>
		</>
	);
};

export default OffRampBankFormScreen;
