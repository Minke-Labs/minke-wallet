import React from 'react';
import { View, FlatList } from 'react-native';
import { networks } from '@models/network';
import { BasicLayout } from '@layouts';
import { useNetwork, useLanguage } from '@hooks';
import { Header } from '@components';
import RNTestFlight from 'react-native-test-flight';
import RNUxcam from 'react-native-ux-cam';
import ListItem from './ListItem/ListItem';
import styles from './ChangeNetworkScreen.styles';

const ChangeNetworkScreen = () => {
	RNUxcam.tagScreenName('ChangeNetworkScreen');
	const { i18n } = useLanguage();
	const { selectNetwork, network } = useNetwork();

	return (
		<BasicLayout>
			<Header title={i18n.t('ChangeNetworkScreen.header_title')} done />

			<View style={styles.padding}>
				<FlatList
					data={Object.values(networks).filter(
						({ testnet }) => RNTestFlight.isTestFlight || __DEV__ || !testnet
					)}
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
