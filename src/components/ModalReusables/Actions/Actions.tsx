import React from 'react';
import { View } from '@components';
import { useNavigation } from '@hooks';
import IconItem from '../../IconItem/IconItem';

const ActionsModal = () => {
	const navigation = useNavigation();
	return (
		<View>
			<IconItem
				onPress={() => navigation.navigate('ExchangeScreen')}
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
