import React from 'react';
import { Text } from 'react-native-paper';
import { WalletToken } from '@src/model/wallet';
import Item from '../../TransactionContacts/Item';
import styles from './TokenItem.styles';

const TokenItem = ({ token, onSelected }: { token: WalletToken; onSelected: (coin: WalletToken) => void }) => (
	<Item
		firstLine={token.symbol}
		secondLine={
			// eslint-disable-next-line react/jsx-wrap-multilines
			<Text style={styles.subtitle}>
				${token.balanceUSD.toString().match(/^-?\d+(?:\.\d{0,2})?/)} ({token.balance} {token.symbol})
				<Text style={styles.available}> Available</Text>
			</Text>
		}
		imageSource={require('@assets/eth.png')}
		onSelected={() => onSelected(token)}
	/>
);

export default TokenItem;
