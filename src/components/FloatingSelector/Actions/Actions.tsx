import React from 'react';
import { useNavigation } from '@hooks';
import { RootStackParamList } from '@src/routes/types.routes';
import IconItem from '../../IconItem/IconItem';
import View from '../../View/View';

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
				mb="s"
				title="Exchange"
				desc="Swap one token for another"
				icon="exchange"
			/>
			<IconItem
				onPress={onSendPress}
				mb="s"
				title="Send"
				desc="To another wallet or an exchange"
				icon="send"
			/>
			<IconItem
				onPress={onReceivePress}
				mb="s"
				title="Receive"
				desc="From another wallet or exchange"
				icon="receive"
			/>
			<IconItem
				onPress={() => handleNavigate('TransactionsScreen')}
				mb="s"
				title="Transactions"
				desc="To another wallet or an exchange"
				icon="transactions"
			/>
		</View>
	);
};

export default ActionsModal;
