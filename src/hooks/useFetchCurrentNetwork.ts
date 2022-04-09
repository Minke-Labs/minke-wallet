import { useState, useEffect } from 'react';
import { Network, network as selectedNetwork } from '@models/network';

const useFetchCurrentNetwork = () => {
	const [network, setNetwork] = useState<Network>();

	const fetchNetwork = async () => {
		const selected = await selectedNetwork();
		setNetwork(selected);
	};

	useEffect(() => {
		fetchNetwork();
	}, []);

	return network;
};

export default useFetchCurrentNetwork;
