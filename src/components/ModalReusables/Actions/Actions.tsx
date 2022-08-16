import React from 'react';
import { View } from '@components';
import IconItem from '../../IconItem/IconItem';

const ActionsModal = () => (
	<View>
		<IconItem
			mb={4}
			title="Exchange"
			desc="Swap one token for another"
			icon="exchange"
		/>
		<IconItem
			mb={4}
			title="Send"
			desc="To another wallet or an exchange"
			icon="send"
		/>
		<IconItem
			mb={4}
			title="Receive"
			desc="From another wallet or exchange"
			icon="receive"
		/>
		<IconItem
			mb={4}
			title="Transactions "
			desc="To another wallet or an exchange "
			icon="transactions"
		/>
	</View>
);

export default ActionsModal;
