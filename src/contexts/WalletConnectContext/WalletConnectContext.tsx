import React from 'react';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletConnectContext: React.FC = ({ children }) => (
	<WalletConnectProvider
		redirectUrl={Platform.OS === 'web' ? window.location.origin : Linking.createURL('/')}
		storageOptions={{
			// @ts-ignore
			asyncStorage: AsyncStorage
		}}
	>
		<>{children}</>
	</WalletConnectProvider>
);

export default WalletConnectContext;
