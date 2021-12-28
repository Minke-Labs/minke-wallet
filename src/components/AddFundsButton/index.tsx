import React from 'react';
import { Image } from 'react-native';
import { Portal, Modal, Text, Button, Card, IconButton } from 'react-native-paper';

const AddFundsButton = () => {
	const [visible, setVisible] = React.useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const containerStyle = { backgroundColor: 'white', padding: 20 };

	return (
		<>
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
					<Text>Add funds</Text>
					<Text>Choose which asset you&apos;d like to buy</Text>
					<Card.Title
						title="Ethereum"
						subtitle="ETH"
						left={({ size }) => (
							<Image
								source={require('./eth.png')}
								style={{ width: size, height: size, tintColor: '#627EEA' }}
							/>
						)}
					/>
				</Modal>
			</Portal>
			<Button style={{ marginBottom: 5 }} mode="contained" onPress={showModal}>
				Add funds
			</Button>
		</>
	);
};

export default AddFundsButton;
