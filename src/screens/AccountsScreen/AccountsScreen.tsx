import React from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { BasicLayout } from '@layouts';
import { Text, Icon, Modal } from '@components';
import { useLanguage } from '@hooks';
import styles from './AccountsScreen.styles';
import ListItem from './ListItem/ListItem';
import ImportWalletModal from '../WelcomeScreen/ImportWalletModal/ImportWalletModal';
import { useAccountsScreen } from './AccountsScreen.hooks';

const AccountsScreen = () => {
	const { address, wallets, goBack, onImportFinished, onSelectWallet, isModalVisible, setModalVisible } =
		useAccountsScreen();
	const { i18n } = useLanguage();

	return (
		<BasicLayout>
			<View style={styles.header}>
				<TouchableOpacity activeOpacity={0.6} onPress={goBack}>
					<Icon name="arrowBackStroke" color="text7" size={24} />
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} onPress={() => setModalVisible(true)}>
					<Text weight="medium" color="text7" type="a">
						{i18n.t('AccountsScreen.import_or_restore')}
					</Text>
				</TouchableOpacity>
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
			<Modal isVisible={isModalVisible} onDismiss={() => setModalVisible(false)}>
				<ImportWalletModal
					visible={isModalVisible}
					onImportFinished={onImportFinished}
					onDismiss={() => setModalVisible(false)}
				/>
			</Modal>
		</BasicLayout>
	);
};

export default AccountsScreen;
