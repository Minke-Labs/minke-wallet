import React, { createContext, useMemo } from 'react';
import { useState } from '@hookstate/core';
import * as Amplitude from 'expo-analytics-amplitude';
import { globalWalletState } from '@src/stores/WalletStore';
import { AMPLITUDE_PROJECT_API } from '@env';

export type TrackingOptions = {
	[key: string]: any;
};

const normalizeTrackingOptions = (options?: TrackingOptions) => {
	if (!options) return null;
	const { ...rest } = options;
	return rest;
};

// ----------------------------------------------------------------------------
const apiKey = AMPLITUDE_PROJECT_API || process.env.AMPLITUDE_PROJECT_API;
// ----------------------------------------------------------------------------

export const AmplitudeContext = createContext<any>(null);

const AmplitudeProvider: React.FC = ({ children }) => {
	const wallet = useState(globalWalletState());
	const {
		address,
		network: { name: network }
	} = wallet.value;

	const [isInitialized, setIsInitialized] = React.useState(false);

	const initialize = async () => {
		if (isInitialized || __DEV__) return;
		await Amplitude.initializeAsync(apiKey!);
		setIsInitialized(true);
	};

	const track = async (event: string, options?: TrackingOptions) => {
		initialize();
		if (!isInitialized) return;

		const properties = normalizeTrackingOptions(options) || {};

		if (properties || address) {
			await Amplitude.logEventWithPropertiesAsync(event, { address, network, ...properties });
		} else await Amplitude.logEventAsync(event);
	};

	const obj = useMemo(() => ({ track }), [track, isInitialized]);

	return <AmplitudeContext.Provider value={obj}>{children}</AmplitudeContext.Provider>;
};

export default AmplitudeProvider;
