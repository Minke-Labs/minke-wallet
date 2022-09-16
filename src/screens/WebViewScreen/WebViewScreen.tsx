import React from 'react';
import WebView from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/routes/types.routes';
import { BasicLayout } from '@layouts';
import { Header } from '@components';
import { useNavigation } from '@hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'WebViewScreen'>;
const WebViewScreen = ({ route }: Props) => {
	const { title, uri, onNavigationStateChange } = route.params;
	const navigation = useNavigation();

	return (
		<BasicLayout>
			<Header
				onPress={() => navigation.goBack()}
				title={title}
				mb="xxs"
			/>
			<WebView
				source={{ uri }}
				sharedCookiesEnabled
				onNavigationStateChange={onNavigationStateChange}
				enableApplePay
				useWebKit
			/>
		</BasicLayout>
	);
};

export default WebViewScreen;
