import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import {
	WelcomeScreen,
	WalletCreatedScreen,
	BackupScreen,
	WalletScreen,
	TransactionSelectFundsScreen,
	TransactionContactsScreen,
	TransactionTransferScreen,
	ContactCreateScreen,
	ExchangeScreen,
	ExchangeResumeScreen,
	SettingsScreen,
	ChangeNetworkScreen,
	BackupSettingsScreen,
	TransactionsScreen,
	Test
} from '@screens';
import { RootStackParamList } from './types.routes';
// const AccountsScreen = () => <Text>AccountsScreen</Text>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: React.FC = () => {
	const scheme = useColorScheme();

	const defaultOptions = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => ({
		title: '',
		headerStyle: {
			backgroundColor: scheme === 'dark' ? '#0A2138' : '#F2EAE1'
		},
		headerShadowVisible: false,
		headerLeft: () => (
			<MaterialIcons
				name="arrow-back-ios"
				size={24}
				color={scheme === 'dark' ? '#FFFFFF' : '#006AA6'}
				onPress={() => navigation.goBack()}
			/>
		)
	});

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Test">
				<Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
				<Stack.Screen options={{ headerShown: false }} name="Test" component={Test} />
				<Stack.Screen options={{ headerShown: false }} name="WalletCreated" component={WalletCreatedScreen} />
				<Stack.Screen options={{ headerShown: false }} name="Backup" component={BackupScreen} />
				<Stack.Screen options={{ headerShown: false }} name="Wallet" component={WalletScreen} />
				<Stack.Screen name="TransactionSelectFunds" component={TransactionSelectFundsScreen} />
				<Stack.Screen
					options={{ headerShown: false }}
					initialParams={{ coin: 'eth' }}
					name="TransactionContacts"
					component={TransactionContactsScreen}
				/>
				<Stack.Screen
					options={{ headerShown: false }}
					name="TransactionTransfer"
					component={TransactionTransferScreen}
				/>
				<Stack.Screen
					options={(props) => defaultOptions(props)}
					name="ContactCreate"
					component={ContactCreateScreen}
				/>
				<Stack.Screen name="Exchange" component={ExchangeScreen} options={(props) => defaultOptions(props)} />
				<Stack.Screen
					name="ExchangeResume"
					component={ExchangeResumeScreen}
					options={(props) => defaultOptions(props)}
				/>
				<Stack.Screen name="Settings" component={SettingsScreen} options={(props) => defaultOptions(props)} />
				<Stack.Screen
					name="ChangeNetwork"
					component={ChangeNetworkScreen}
					options={(props) => defaultOptions(props)}
				/>

				{/* <Stack.Screen
					name="Accounts"
					component={AccountsScreen}
					options={(props) => ({
						...defaultOptions(props),
						...{
							headerRight: () => {
								// eslint-disable-next-line react/prop-types
								const { navigation }: NativeStackScreenProps<RootStackParamList> = props;
								return (
									<ImportWalletButton
										// eslint-disable-next-line react/prop-types
										onImportFinished={() => navigation.navigate('WalletCreated')}
										button={<PrimaryButton mode="text">Import</PrimaryButton>}
									/>
								);
							}
						}
					})}
				/> */}

				<Stack.Screen
					name="BackupSettings"
					component={BackupSettingsScreen}
					options={(props) => defaultOptions(props)}
				/>
				<Stack.Screen
					name="Transactions"
					component={TransactionsScreen}
					options={(props) => defaultOptions(props)}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
