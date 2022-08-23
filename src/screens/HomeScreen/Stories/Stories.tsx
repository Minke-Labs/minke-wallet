import React, { useEffect, useRef } from 'react';
import { Paper, Text } from '@components';
import { useColorScheme, Platform } from 'react-native';
import { useLanguage, useWalletState } from '@hooks';
import { STORYTELLER_KEY, STORYTELLER_ANDROID_KEY } from '@env';
import Storyteller, { StorytellerRowView, UIStyle } from '@getstoryteller/react-native-storyteller-sdk';
import { storytellerTheme } from './storytellerTheme';

export const Stories = () => {
	const { state } = useWalletState();
	const { language } = useLanguage();
	const { address: walletAddress } = state.value;
	const scheme = useColorScheme();
	const rowRef = useRef<StorytellerRowView>(null);
	const apiKey =
		Platform.OS === 'android'
			? STORYTELLER_ANDROID_KEY || process.env.STORYTELLER_ANDROID_KEY
			: STORYTELLER_KEY || process.env.STORYTELLER_KEY;

	const reloadDataIfNeeded = () => {
		if (rowRef.current) rowRef.current.reloadData();
	};

	const initializeStoryteller = () => {
		Storyteller.initialize(apiKey!, walletAddress, '', [], () => {
			reloadDataIfNeeded();
		});
	};

	useEffect(() => {
		initializeStoryteller();
	}, []);

	useEffect(() => {
		reloadDataIfNeeded();
	}, [language]);

	return (
		<Paper p="xs">
			<Text type="lMedium" weight="semiBold" mb="xs">
				Learn about Minke
			</Text>
			<StorytellerRowView
				cellType="round"
				theme={storytellerTheme}
				ref={rowRef}
				style={{ height: 91 }}
				uiStyle={scheme === 'dark' ? ('dark' as UIStyle) : ('light' as UIStyle)}
				categories={[language as string, 'all']}
			/>
		</Paper>
	);
};
