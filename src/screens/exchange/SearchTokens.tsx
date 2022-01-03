import React from 'react';
import { Modal } from 'react-native-paper';
import { Text } from 'react-native';

const SearchTokens = ({ visible, onDismiss }: { visible: boolean; onDismiss: any }) => {
	const containerStyle = { backgroundColor: 'white', padding: 20 };
	return (
		<Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
			<Text>Example Modal. Click outside this area to dismiss.</Text>
		</Modal>
	);
};

export default SearchTokens;
