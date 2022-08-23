import React from 'react';
import { Paper2, Text, View, Button } from '@components';
import { useCountry } from '@hooks';
import APay from './APay';
import Debit from './Debit';
import { chooseLocation } from './chooseLocation';

interface AccountsEmptyProps {
	setAddFundsVisible: (val: boolean) => void;
}

export const AccountsEmpty: React.FC<AccountsEmptyProps> = ({ setAddFundsVisible }) => {
	const { countryCode } = useCountry();
	const localPayment = chooseLocation(countryCode);
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
				onPress={() => setAddFundsVisible(true)}
			/>
		</Paper2>
	);
};
