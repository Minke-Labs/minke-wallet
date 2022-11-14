/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { useVector } from 'react-native-redash';
import { getTokenHistory } from '@models/token';
import { MinkeToken } from '@models/types/token.types';
import { GraphIndex } from './Upper.types';

export const useUpper = (coin: MinkeToken) => {
	const [tokenHistory, setTokenHistory] = useState<any>(undefined);
	const translation = useVector();
	const transition = useSharedValue(0);
	const previous = useSharedValue<GraphIndex>(0);
	const current = useSharedValue<GraphIndex>(0);

	const fetchTokenHistory = async () => {
		const res = await getTokenHistory(coin);
		if (res?.errors) {
			setTokenHistory(null);
		} else {
			setTokenHistory(res);
		}
	};

	useEffect(() => {
		fetchTokenHistory();
	}, []);

	return {
		tokenHistory,
		transition,
		previous,
		current,
		translation
	};
};
