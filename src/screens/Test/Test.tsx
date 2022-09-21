import React from 'react';
import { BlankStates } from '@components';
import WalletConnect from '@walletconnect/client';

const Test = () => {
	const connector = new WalletConnect({
		bridge: 'https://bridge.walletconnect.org' // Required
	});

	// Check if connection is already established
	if (!connector.connected) {
		// create new session
		connector.createSession();
	}

	// Subscribe to connection events
	connector.on('connect', (error, payload) => {
		if (error) {
			throw error;
		}

		// Get provided accounts and chainId
		const { accounts, chainId } = payload.params[0];
	});

	connector.on('session_update', (error, payload) => {
		if (error) {
			throw error;
		}

		// Get updated accounts and chainId
		const { accounts, chainId } = payload.params[0];
	});

	connector.on('disconnect', (error, payload) => {
		if (error) {
			throw error;
		}

		// Delete connector
	});
	return <BlankStates.Type2 title="Test" />;
};

export default Test;
