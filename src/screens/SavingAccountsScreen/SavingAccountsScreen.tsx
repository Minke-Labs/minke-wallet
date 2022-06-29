import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { SettingsHeader } from '@components';
import { BasicLayout } from '@layouts';
import { useDepositProtocols, useLanguage, useNavigation } from '@hooks';
import RNUxcam from 'react-native-ux-cam';
import { availableDepositProtocols } from '@models/deposit';
import ListItem from '../USDCoinScreen/ListItem/ListItem';
import styles from './SavingAccountsScreen.styles';

const SavingAccountsScreen = () => {
	const { selectedProtocol, onChangeProtocol } = useDepositProtocols();
	const navigation = useNavigation();
	const { i18n } = useLanguage();
	RNUxcam.tagScreenName('SavingAccountsScreen');

	return (
		<BasicLayout>
			<SettingsHeader title={i18n.t('SavingAccountsScreen.title')} onPress={() => navigation.goBack()} />

			<View style={styles.container}>
				<SafeAreaView>
					<FlatList
						style={{ paddingTop: 24, paddingBottom: 24 }}
						data={Object.values(availableDepositProtocols)}
						renderItem={({ item }) => (
							<ListItem
								label={item.name}
								selected={selectedProtocol === item}
								onPress={() => onChangeProtocol(item)}
								token={item.icon}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</SafeAreaView>
			</View>
		</BasicLayout>
	);
};

export default SavingAccountsScreen;
