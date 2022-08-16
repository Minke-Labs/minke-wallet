import React from 'react';
import { ScrollView } from 'react-native';
import { View } from '@components';
import { BasicLayout } from '@layouts';
import { Header } from './Header/Header';
import { Balance } from './Balance/Balance';
import ByNetworks from './ByNetworks/ByNetworks';

const AssetDetailScreen = () => (
	<BasicLayout>
		<ScrollView showsVerticalScrollIndicator={false}>
			<View ph={3}>
				<Header onPress={() => null} />
				<Balance />
				<ByNetworks />
			</View>
		</ScrollView>
	</BasicLayout>
);

export default AssetDetailScreen;
