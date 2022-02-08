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

const WalletScreen = () => {
	const [height, setHeight] = useState(0);
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	const onSettingsPress = () => navigation.navigate('Settings');

	return (
		<>
			<WelcomeLayout>
				<View style={styles.container} onLayout={(e) => setHeight(e.nativeEvent.layout.height)}>
					<Header onSettingsPress={onSettingsPress} />
					<AssetsPanel />
					<ActionsPanel />
				</View>
			</WelcomeLayout>
			<FinancePanel {...{ height }} />
		</>
	);
};

export default WalletScreen;
