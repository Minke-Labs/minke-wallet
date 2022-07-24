import React, { useEffect } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Text, EmptyStates } from '@components';
import { useLanguage } from '@hooks';
import { imageSource } from '@models/wallet';
import { styles } from './TransactionSelectFunds.styles';
import { Card } from '../../components';
import { TransactionSelectFundsProps } from './TransactionSelectFunds.types';

const TransactionSelectFunds: React.FC<TransactionSelectFundsProps> = ({ user, onSelected, tokens }) => {
	const { i18n } = useLanguage();
	const [image, setImage] = React.useState<{ uri: string }>();

	useEffect(() => {
		const fetchImage = async () => {
			setImage(await imageSource(user.address));
		};
		fetchImage();
	}, []);

	return (
		<View style={styles.container}>
			{!!user.address && <Image source={image!} style={styles.image} />}
			<Text type="h3" weight="extraBold" marginBottom={32}>
				{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionSelectFunds.which')}
				<Text color="text12" type="h3" weight="extraBold">
					{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionSelectFunds.asset')}
				</Text>{' '}
				{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionSelectFunds.want_to_send')}
				<Text color="text12" type="h3" weight="extraBold">
					{user.name}
				</Text>
				?
			</Text>
			{tokens.length > 0 ? (
				<FlatList
					style={styles.tokensList}
					keyExtractor={(item) => item.symbol}
					data={tokens}
					renderItem={({ item }) => (
						<Card
							token={item}
							onSelected={() => onSelected(item)}
						/>
					)}
				/>
			) : (
				<EmptyStates.NoTokens />
			)}
		</View>
	);
};

export default TransactionSelectFunds;
