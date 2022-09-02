import React from 'react';
import { useNavigation, useLanguage } from '@hooks';
import { RootStackParamList } from '@src/routes/types.routes';
import IconItem from '../../IconItem/IconItem';
import View from '../../View/View';

interface ActionsModalProps {
	onDismiss: () => void;
	onReceivePress: () => void;
	onSendPress: () => void;
}

const ActionsModal: React.FC<ActionsModalProps> = ({ onDismiss, onSendPress, onReceivePress }) => {
	const { i18n } = useLanguage();
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
				title={i18n.t('Components.FloatingSelector.Actions.exchange')}
				desc={i18n.t('Components.FloatingSelector.Actions.swap')}
				icon="exchange"
			/>
			<IconItem
				onPress={onSendPress}
				mb="s"
				title={i18n.t('Components.FloatingSelector.Actions.send')}
				desc={i18n.t('Components.FloatingSelector.Actions.to_another')}
				icon="send"
			/>
			<IconItem
				onPress={onReceivePress}
				mb="s"
				title={i18n.t('Components.FloatingSelector.Actions.receive')}
				desc={i18n.t('Components.FloatingSelector.Actions.from_another')}
				icon="receive"
			/>
			<IconItem
				onPress={() => handleNavigate('TransactionsScreen')}
				mb="s"
				title={i18n.t('Components.FloatingSelector.Actions.transactions')}
				desc={i18n.t('Components.FloatingSelector.Actions.to_another')}
				icon="transactions"
			/>
		</View>
	);
};

export default ActionsModal;
