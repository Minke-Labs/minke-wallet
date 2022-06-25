/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, useColorScheme } from 'react-native';
import { Text, Icon } from '@components';
import { useLanguage, useWalletState } from '@hooks';
import Storyteller, { StorytellerRowView, UIStyle } from '@getstoryteller/react-native-storyteller-sdk';

const Stories: React.FC = () => {
	const { state } = useWalletState();
	const { i18n } = useLanguage();
	const { address: walletAddress } = state.value;
	const [toggle, setToggle] = useState(false);
	const scheme = useColorScheme();
	const rowRef = useRef<StorytellerRowView>(null);

	const reloadDataIfNeeded = () => {
		if (rowRef.current) rowRef.current.reloadData();
	};

	const initializeStoryteller = () => {
		Storyteller.initialize(
			'6bffbf54-1f06-4d5e-a971-c200e4fc3eea',
			walletAddress,
			'',
			[],
			(callback: { result: Boolean, message: string }) => {
				console.log(`\n\n\nresult: ${callback.result}. Message: ${callback.message}`);
				reloadDataIfNeeded();
			}
		);
	};

	useEffect(() => {
		initializeStoryteller();
	}, []);

	return (
		<View style={{ marginBottom: 64 }}>
			<TouchableOpacity
				onPress={() => setToggle(!toggle)}
				style={{ flexDirection: 'row', alignItems: 'center' }}
			>
				<Text
					weight="semiBold"
					type="p2" // TODO: Change to lMedium after merging the other branches
					style={{ marginRight: 8 }}
				>
					{i18n.t('WalletScreen.components.Stories.whats_new')}
				</Text>
				<Icon
					name={toggle ? 'chevronUp' : 'chevronDown'}
					size={24}
					color="cta1"
				/>
			</TouchableOpacity>
			<View style={{ width: '100%', marginTop: 12, display: toggle ? 'flex' : 'none' }}>
				<StorytellerRowView
					ref={rowRef}
					style={{ height: 91 }}
					uiStyle={scheme === 'dark' ? 'dark' as UIStyle : 'light' as UIStyle}
					onDataLoadStarted={() => console.log('STORIES LOADING...')}
					onDataLoadCompleted={() => console.log('STORIES FULLY LOADED.')}
				/>
			</View>
		</View>
	);
};

export default Stories;
