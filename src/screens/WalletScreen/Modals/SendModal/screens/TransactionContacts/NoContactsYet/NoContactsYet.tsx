import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@components';
import { whale3Img } from '@images';
import { useLanguage } from '@hooks';
import styles from './NoContactsYet.styles';

export const NoContactsYet = () => {
	const { i18n } = useLanguage();
	return (
		<View style={styles.container}>
			<Image source={whale3Img} style={styles.image} />
			<Text type="p2" marginBottom={15}>
				{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionContacts.NoContactsYet.no_contacts_yet')}
			</Text>
			<Text weight="bold" type="p2" marginBottom={65}>
				{i18n.t('WalletScreen.Modals.SendModal.screens.TransactionContacts.NoContactsYet.add_some')}
			</Text>
		</View>
	);
};
