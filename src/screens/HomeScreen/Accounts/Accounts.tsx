import React from 'react';
import { Paper2, Text, View, Button } from '@components';
import APay from './APay.svg';
import Debit from './Debit.svg';
import Pix from './Pix.svg';

export const Accounts = () => (
	<Paper2 br={3} p={3} mb={3}>
		<Text type="tSmall" weight="bold" color="cta1" mb={3}>
			Buy USDC now!{'\n'}No personal ID required.
		</Text>
		<Text type="lSmall" weight="semiBold" mb={3}>
			Purchase in a few clicks with:
		</Text>
		<View mb={4} row>
			<APay />
			<View mr={3} />
			<Debit />
			<View mr={3} />
			<Pix />
		</View>
		<Button
			title="Buy USDC now"
			mode="outlined"
			onPress={() => null}
		/>
	</Paper2>
);
