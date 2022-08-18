import React from 'react';
import { View, IconItem } from '@components';
import { useNavigation } from '@hooks';
import { RootStackParamList } from '@src/routes/types.routes';

interface ActionsModalProps {
	onDismiss: () => void;
	onReceivePress: () => void;
	onSendPress: () => void;
}

const ActionsModal: React.FC<ActionsModalProps> = ({ onDismiss, onSendPress, onReceivePress }) => {
	const navigation = useNavigation();

	const handleNavigate = (path: keyof RootStackParamList) => {
		onDismiss();
		navigation.navigate(path);
	};

	return (
		<View>
			<IconItem
				onPress={() => handleNavigate('ExchangeScreen')}
				mb={4}
				title="Exchange"
				desc="Swap one token for another"
				icon="exchange"
			/>
			<IconItem
				onPress={onSendPress}
				mb={4}
				title="Send"
				desc="To another wallet or an exchange"
				icon="send"
			/>
			<IconItem
				onPress={onReceivePress}
				mb={4}
				title="Receive"
				desc="From another wallet or exchange"
				icon="receive"
			/>
			<IconItem
				onPress={() => handleNavigate('TransactionsScreen')}
				mb={4}
				title="Transactions"
				desc="To another wallet or an exchange"
				icon="transactions"
			/>
		</View>
	);
};

export default ActionsModal;
