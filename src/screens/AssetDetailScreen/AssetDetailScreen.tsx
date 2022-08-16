import React from 'react';
import { ScrollView } from 'react-native';
import { View } from '@components';
import { BasicLayout } from '@layouts';
import { useNavigation } from '@hooks';
import { Header } from './Header/Header';
import { Balance } from './Balance/Balance';
import ByNetworks from './ByNetworks/ByNetworks';
import About from './About/About';

const AssetDetailScreen = () => {
	const navigation = useNavigation();
	return (
		<BasicLayout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View ph={3}>
					<Header onPress={() => navigation.goBack()} />
					<Balance />
					<ByNetworks />
					<About />
				</View>
			</ScrollView>
		</BasicLayout>
	);
};

export default AssetDetailScreen;
