import React from 'react';
import { View } from 'react-native';
import { WelcomeLayout } from '@layouts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from './Header';
import AssetsPanel from './AssetsPanel';
import ActionsPanel from './ActionsPanel';
import styles from './WalletScreen.styles';
import { RootStackParamList } from '../../routes/types.routes';

const WalletScreen = () => {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const onSettingsPress = () => navigation.navigate('Settings');

	return (
		<WelcomeLayout>
			<View style={styles.container}>
				<Header onSettingsPress={onSettingsPress} />
				<AssetsPanel />
				<ActionsPanel />
			</View>
		</WelcomeLayout>
	);
};

export default WalletScreen;
