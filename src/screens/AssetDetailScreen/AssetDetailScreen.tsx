import React from 'react';
import { View } from '@components';
import { BasicLayout } from '@layouts';
import { Header } from './Header/Header';
import { Balance } from './Balance/Balance';
import ByNetworks from './ByNetworks/ByNetworks';

const AssetDetailScreen = () => (
	<BasicLayout>
		<View ph={3}>
			<Header onPress={() => null} />
			<Balance />
			<ByNetworks />
		</View>
	</BasicLayout>
);

export default AssetDetailScreen;
