import React from 'react';
import { Text } from 'react-native-paper';
import Modal from 'old/src/components/Modal';
import globalStyles from 'old/src/components/global.styles';
import CoinSelector from './CoinSelector';

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
			<Text style={globalStyles.subHeadline}>Choose which asset you&apos;d like to buy</Text>
			<CoinSelector onSelect={onCoinSelected} />
		</>
	</Modal>
);

export default AddFundsModal;
