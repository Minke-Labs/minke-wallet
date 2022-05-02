import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { SettingsHeader } from '@components';
import { BasicLayout } from '@layouts';
import { useDepositProtocols, useNavigation } from '@hooks';
import ListItem from '../USDCoinScreen/ListItem/ListItem';
import styles from './SavingAccountsScreen.styles';

const SavingAccountsScreen = () => {
	const { availableDepositProtocols, selectedProtocol, onChangeProtocol } = useDepositProtocols();
	const navigation = useNavigation();

	return (
		<BasicLayout>
			<SettingsHeader title="USD Asset" onPress={() => navigation.goBack()} />

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
