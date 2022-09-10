import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { BasicLayout } from '@layouts';
import { Text, Icon, Touchable } from '@components';
import { useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import styles from './AccountsScreen.styles';
import ListItem from './ListItem/ListItem';
import { useAccountsScreen } from './AccountsScreen.hooks';

const AccountsScreen = () => {
	RNUxcam.tagScreenName('AccountsScreen');
	const { address, wallets, goBack, onSelectWallet, onImportWallet } = useAccountsScreen();
	const { i18n } = useLanguage();

	return (
		<BasicLayout>
			<View style={styles.header}>
				<Touchable onPress={goBack}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</Touchable>
				<Touchable onPress={onImportWallet}>
					<Text weight="medium" color="text7" type="a">
						{i18n.t('AccountsScreen.import_or_restore')}
					</Text>
				</Touchable>
			</View>

			<View style={styles.container}>
				<Text weight="extraBold" type="h3">
					{i18n.t('AccountsScreen.accounts')}
				</Text>
				<SafeAreaView>
					<FlatList
						style={{ paddingTop: 24, paddingBottom: 24 }}
						data={Object.values(wallets || {})}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<ListItem
								label={item.address}
								selected={item.address === address}
								onPress={() => onSelectWallet(item)}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</SafeAreaView>
			</View>
		</BasicLayout>
	);
};

export default AccountsScreen;
