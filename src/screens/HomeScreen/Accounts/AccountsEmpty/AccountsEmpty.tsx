import React, { useState } from 'react';
import { Paper, Text, View, Button, ModalBase } from '@components';
import { AddFunds } from '@containers';
import { useCountry } from '@hooks';
import APay from './APay';
import Debit from './Debit';
import { chooseLocation } from './chooseLocation';

export const AccountsEmpty: React.FC = () => {
	const [addFundsVisible, setAddFundsVisible] = useState(false);
	const { countryCode } = useCountry();
	const localPayment = chooseLocation(countryCode);
	return (
		<>
			<Paper p="xs" mb="xs">
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
			</Paper>
			<ModalBase isVisible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)}>
				<AddFunds visible={addFundsVisible} onDismiss={() => setAddFundsVisible(false)} />
			</ModalBase>
		</>
	);
};
