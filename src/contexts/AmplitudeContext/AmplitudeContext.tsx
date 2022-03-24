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
	const address = wallet.address.value;

	const [isInitialized, setIsInitialized] = React.useState(false);

	const initialize = async () => {
		if (isInitialized) return;
		await Amplitude.initializeAsync(apiKey!);
		setIsInitialized(true);
	};

	const track = async (event: string, options?: TrackingOptions) => {
		initialize();
		const properties = normalizeTrackingOptions(options) || {};

		if (properties || address) {
			await Amplitude.logEventWithPropertiesAsync(event, { address, ...properties });
		} else await Amplitude.logEventAsync(event);
	};

	const obj = useMemo(() => ({ track }), [track]);

	return <AmplitudeContext.Provider value={obj}>{children}</AmplitudeContext.Provider>;
};

export default AmplitudeProvider;
