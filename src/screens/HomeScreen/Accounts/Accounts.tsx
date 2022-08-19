import React from 'react';
import { Paper2, Text, View, Button } from '@components';
import APay from './APay.svg';
import Debit from './Debit';
import { PayId, Interac, FasterPayments, Sepa } from './images';
import Pix from './Pix.svg';

const chooseLocation = (loc: string) => {
	switch (loc) {
		case 'AU':
			return <PayId />;
		case 'GB':
			return <FasterPayments />;
		case 'CA':
			return <Interac />;
		case 'EU':
		case 'AT':
		case 'BE':
		case 'CY':
		case 'EE':
		case 'FI':
		case 'FR':
		case 'DE':
		case 'GR':
		case 'IE':
		case 'IT':
		case 'LV':
		case 'LT':
		case 'LU':
		case 'MT':
		case 'NE':
		case 'PT':
		case 'SK':
		case 'SI':
		case 'ES':
			return <Sepa />;
		case 'BR':
			return <Pix />;
		default:
			return null;
	}
};

export const Accounts = () => {
	const localPayment = chooseLocation('BR');
	return (
		<Paper2 br="xs" p="xs" mb="xs">
			<Text type="tSmall" weight="bold" color="cta1" mb="xs">
				Buy USDC now!{'\n'}No personal ID required.
			</Text>
			<Text type="lSmall" weight="semiBold" mb="xs">
				Purchase in a few clicks with:
			</Text>
			<View mb="s" row cross="center">
				<APay />
				<View mr="xs" />
				<Debit />
				<View mr="xs" />
				{localPayment}
			</View>
			<Button
				title="Buy USDC now"
				mode="outlined"
				onPress={() => null}
			/>
		</Paper2>
	);
};
