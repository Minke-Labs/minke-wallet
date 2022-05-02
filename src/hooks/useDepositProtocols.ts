import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DepositProtocol {
	id: string;
	name: string;
	icon: string;
}

interface DepositProtocols {
	[key: string]: DepositProtocol;
}

const availableDepositProtocols: DepositProtocols = {
	mstable: {
		id: 'mstable',
		name: 'mStable',
		icon: 'MTA'
	},
	aave: {
		id: 'aave',
		name: 'Aave',
		icon: 'AAVE'
	}
};

const useDepositProtocols = () => {
	const [selectedProtocol, setSelectedProtocol] = useState<DepositProtocol>();

	const onChangeProtocol = async (protocol: DepositProtocol) => {
		await AsyncStorage.setItem('@depositProtocol', protocol.id);
		setSelectedProtocol(protocol);
	};

	useEffect(() => {
		const fetchSelectedProtocol = async () => {
			const protocol = await AsyncStorage.getItem('@depositProtocol');

			if (protocol) {
				setSelectedProtocol(availableDepositProtocols[protocol]);
			} else {
				setSelectedProtocol(availableDepositProtocols.mStable);
			}
		};

		fetchSelectedProtocol();
	}, []);

	return {
		availableDepositProtocols,
		selectedProtocol,
		onChangeProtocol
	};
};

export default useDepositProtocols;
