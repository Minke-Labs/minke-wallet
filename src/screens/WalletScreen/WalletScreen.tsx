import React, { useState } from 'react';
import { View } from 'react-native';
import { WelcomeLayout } from '@layouts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from './Header';
import AssetsPanel from './AssetsPanel';
import ActionsPanel from './ActionsPanel';
import FinancePanel from './FinancePanel';
import styles from './WalletScreen.styles';
import { RootStackParamList } from '../../routes/types.routes';
import TabSelector from './TabSelector/TabSelector';

const WalletScreen = () => {
	const [selectedTab, setSelectedTab] = useState('transactions');
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const onSettingsPress = () => navigation.navigate('Settings');

	return (
		<>
			<WelcomeLayout style={{ flex: 0 }}>
				<View style={styles.container}>
					<Header onSettingsPress={onSettingsPress} />
					<AssetsPanel />
					<ActionsPanel />
					<TabSelector {...{ setSelectedTab, selectedTab }} />
				</View>
			</WelcomeLayout>
			<FinancePanel />
		</>
	);
};

export default WalletScreen;
