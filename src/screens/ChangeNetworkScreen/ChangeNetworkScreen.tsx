import React from 'react';
import { View, FlatList } from 'react-native';
import { networks } from '@models/network';
import { BasicLayout } from '@layouts';
import { SettingsHeader } from '@components';
import ListItem from './ListItem/ListItem';
import styles from './ChangeNetworkScreen.styles';
import { useChangeNetworkScreen } from './ChangeNetworkScreen.hooks';

const ChangeNetworkScreen = () => {
	const { connectedNetwork, selectNetwork, goBack } = useChangeNetworkScreen();

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
							selected={item.id === connectedNetwork?.id}
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
