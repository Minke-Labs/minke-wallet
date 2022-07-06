import { POINTS_PER_REWARD } from '@helpers/utilities';
import { useState } from '@hookstate/core';
import { getRewards } from '@src/services/apis/minke/minke';
import { Reward } from '@src/services/apis/minke/minke.types';
import { globalWalletState } from '@stores/WalletStore';
import React, { useEffect } from 'react';

const useMinkeRewards = () => {
	const { address } = useState(globalWalletState()).value;
	const [points, setPoints] = React.useState(0);
	const [rewards, setRewards] = React.useState<Reward[]>([]);

	useEffect(() => {
		const fetchRewards = async () => {
			const apiRewards = await getRewards(address);
			setRewards(apiRewards);
			setPoints(apiRewards.length * POINTS_PER_REWARD);
		};

		fetchRewards();
	}, []);

	return {
		rewards,
		points
	};
};

export default useMinkeRewards;
