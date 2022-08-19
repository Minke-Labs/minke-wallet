import React from 'react';
import { Paper2, Text, View, Button } from '@components';
import APay from './APay.svg';
import Debit from './Debit';
import Pix from './Pix.svg';

export const Accounts = () => (
	<Paper2 br="xs" p="xs" mb="xs">
		<Text type="tSmall" weight="bold" color="cta1" mb="xs">
			Buy USDC now!{'\n'}No personal ID required.
		</Text>
		<Text type="lSmall" weight="semiBold" mb="xs">
			Purchase in a few clicks with:
		</Text>
		<View mb="s" row>
			<APay />
			<View mr="xs" />
			<Debit />
			<View mr="xs" />
			<Pix />
		</View>
		<Button
			title="Buy USDC now"
			mode="outlined"
			onPress={() => null}
		/>
	</Paper2>
);
