import React from 'react';
import { View, IconItem } from '@components';
import { useNavigation } from '@hooks';

interface ActionsModalProps {
	onDismiss: () => void;
}

const ActionsModal: React.FC<ActionsModalProps> = ({ onDismiss }) => {
	const navigation = useNavigation();

	const handleNavigate = () => {
		onDismiss();
		navigation.navigate('ExchangeScreen');
	};

	return (
		<View>
			<IconItem
				onPress={handleNavigate}
				mb={4}
				title="Exchange"
				desc="Swap one token for another"
				icon="exchange"
			/>
			<IconItem
				onPress={() => null}
				mb={4}
				title="Send"
				desc="To another wallet or an exchange"
				icon="send"
			/>
			<IconItem
				onPress={() => null}
				mb={4}
				title="Receive"
				desc="From another wallet or exchange"
				icon="receive"
			/>
			<IconItem
				onPress={() => null}
				mb={4}
				title="Transactions"
				desc="To another wallet or an exchange"
				icon="transactions"
			/>
		</View>
	);
};

export default ActionsModal;
