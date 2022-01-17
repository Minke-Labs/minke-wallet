import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Modal from '@components/Modal';
import CoinSelector from './CoinSelector';

const styles = StyleSheet.create({
	modalSubHeadline: {
		marginBottom: 24,
		fontSize: 18,
		fontFamily: 'Inter_500Medium'
	}
});

const AddFundsModal = ({
	visible,
	onDismiss,
	onCloseAll,
	onCoinSelected
}: {
	visible: boolean;
	onDismiss: () => void;
	onCloseAll: () => void;
	onCoinSelected: Function;
}) => (
	<Modal visible={visible} onDismiss={onDismiss} headline="Add funds" onCloseAll={onCloseAll}>
		<>
			<Text style={styles.modalSubHeadline}>Choose which asset you&apos;d like to buy</Text>
			<CoinSelector onSelect={onCoinSelected} />
		</>
	</Modal>
);

export default AddFundsModal;
