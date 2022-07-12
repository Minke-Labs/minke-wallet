import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Modal } from '@components';
import { BasicLayout } from '@layouts';
import { AddFunds } from '@containers';

const Test = () => {
	const [visible, setVisible] = useState(false);
	const test = async () => {
		setVisible(!visible);
	};

	const dismiss = () => setVisible(false);

	return (
		<>
			<BasicLayout>
				<View style={{ paddingTop: 160, paddingHorizontal: 24 }}>
					<Button title="Test" onPress={test} marginBottom={48} />
				</View>
			</BasicLayout>
			{visible && (
				<Modal isVisible={visible} onDismiss={dismiss}>
					<AddFunds visible={visible} onDismiss={dismiss} />
				</Modal>
			)}
		</>
	);
};

export default Test;
