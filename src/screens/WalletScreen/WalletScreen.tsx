import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TabLayout } from '@layouts';
import Header from './Header';
import AssetsPanel from './AssetsPanel';
import ActionsPanel from './ActionsPanel';
import { RootStackParamList } from '../../routes/types.routes';

const WalletScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const onSettingsPress = () => navigation.navigate('Settings');

	return (
		<TabLayout>
			<Header onSettingsPress={onSettingsPress} />
			<AssetsPanel />
			<ActionsPanel />
		</TabLayout>
	);
};

export default WalletScreen;
