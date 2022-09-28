import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { BasicLayout } from '@layouts';
import { Header } from '@components';
import { useLanguage } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import styles from './AccountsScreen.styles';
import ListItem from './ListItem/ListItem';
import { useAccountsScreen } from './AccountsScreen.hooks';

const AccountsScreen = () => {
	RNUxcam.tagScreenName('AccountsScreen');
	const { address, wallets, onSelectWallet, onImportWallet } = useAccountsScreen();
	const { i18n } = useLanguage();

	return (
		<BasicLayout>
			<Header
				title={i18n.t('AccountsScreen.accounts')}
				rightAction={i18n.t('AccountsScreen.import_or_restore')}
				onRightActionClick={onImportWallet}
			/>

			<View style={styles.container}>
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
