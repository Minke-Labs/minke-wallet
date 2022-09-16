import React from 'react';
import { Text, Paper, Touchable, Icon } from '@components';

interface NewBankButtonProps {
	onPress: () => void;
}

export const NewBankButton: React.FC<NewBankButtonProps> = ({ onPress }) => (
	<Touchable row w="100%" onPress={onPress}>
		<Paper
			row
			p="xs"
			w="100%"
			main="space-between"
		>
			<Text color="cta1" weight="semiBold" type="lLarge">
				Add new bank account
			</Text>
			<Icon
				name="add"
				size={21}
				color="cta1"
			/>
		</Paper>
	</Touchable>
);
