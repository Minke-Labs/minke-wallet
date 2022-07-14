import React from 'react';
import { View, FlatList } from 'react-native';
import { networks } from '@models/network';
import { BasicLayout } from '@layouts';
import { useNavigation, useNetwork, useLanguage } from '@hooks';
import { SettingsHeader } from '@components';
import RNUxcam from 'react-native-ux-cam';
import ListItem from './ListItem/ListItem';
import styles from './ChangeNetworkScreen.styles';

const ChangeNetworkScreen = () => {
	const { i18n } = useLanguage();
	const navigation = useNavigation();
	const goBack = () => navigation.goBack();
	const { selectNetwork, network } = useNetwork();
	RNUxcam.tagScreenName('ChangeNetworkScreen');

	return (
		<BasicLayout>
			<SettingsHeader title={i18n.t('ChangeNetworkScreen.header_title')} onPress={goBack} />

			<View style={styles.padding}>
				<FlatList
					data={Object.values(networks).filter(({ testnet }) => __DEV__ || !testnet)}
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
