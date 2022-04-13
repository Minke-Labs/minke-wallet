import React from 'react';
import { View, FlatList } from 'react-native';
import { networks } from '@models/network';
import { BasicLayout } from '@layouts';
import { useNavigation, useNetwork } from '@hooks';
import { SettingsHeader } from '@components';
import ListItem from './ListItem/ListItem';
import styles from './ChangeNetworkScreen.styles';

const ChangeNetworkScreen = () => {
	const navigation = useNavigation();
	const goBack = () => navigation.goBack();
	const { selectNetwork, network } = useNetwork();

	return (
		<BasicLayout>
			<SettingsHeader title="Network" onPress={goBack} />

			<View style={styles.padding}>
				<FlatList
					data={Object.values(networks)}
					renderItem={({ item }) => (
						<ListItem
							label={item.name}
							onPress={() => selectNetwork(item)}
							selected={item.id === network?.id}
							token={item.nativeToken.symbol}
							testnet={item.testnet}
						/>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</BasicLayout>
	);
};

export default ChangeNetworkScreen;
