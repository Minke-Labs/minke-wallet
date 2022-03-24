import React, { createContext, useMemo, useEffect } from 'react';
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
const apiKey = AMPLITUDE_PROJECT_API;
// ----------------------------------------------------------------------------

export const AmplitudeContext = createContext<any>(null);

const AmplitudeProvider: React.FC = ({ children }) => {
	const wallet = useState(globalWalletState());
	const address = wallet.address.value;

	const [isInitialized, setIsInitialized] = React.useState(false);

	const initialize = async () => {
		if (isInitialized) return;
		await Amplitude.initializeAsync(apiKey);
		setIsInitialized(true);
	};

	const identify = async (id: string | null, options?: TrackingOptions) => {
		initialize();
		const properties = normalizeTrackingOptions(options);

		if (id) {
			await Amplitude.setUserIdAsync(id);
			if (properties) await Amplitude.setUserPropertiesAsync(properties);
			else await Amplitude.clearUserPropertiesAsync();
		}
	};

	const track = async (event: string, options?: TrackingOptions) => {
		initialize();
		const properties = normalizeTrackingOptions(options);

		if (properties) await Amplitude.logEventWithPropertiesAsync(event, properties);
		else await Amplitude.logEventAsync(event);
	};

	useEffect(() => {
		identify(address);
	}, []);

	const obj = useMemo(() => ({ identify, track }), [identify, track]);

	return <AmplitudeContext.Provider value={obj}>{children}</AmplitudeContext.Provider>;
};

export default AmplitudeProvider;
