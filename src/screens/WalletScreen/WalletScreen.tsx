import React from 'react';
import RNUxcam from 'react-native-ux-cam';
import { useWalletScreen } from './WalletScreen.hooks';
import { Content } from './Content/Content';

const WalletScreen = () => {
	RNUxcam.tagScreenName('WalletScreen');
	const {
		onSettingsPress,
		onPointsPress
	} = useWalletScreen();
	return (
		<Content
			{...{
				onSettingsPress,
				onPointsPress
			}}
		/>
	);
};

export default WalletScreen;
