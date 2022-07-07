import { POINTS_PER_REWARD } from '@helpers/utilities';
import { useState } from '@hookstate/core';
import { useFocusEffect } from '@react-navigation/native';
import { getRewards } from '@src/services/apis/minke/minke';
import { Reward } from '@src/services/apis/minke/minke.types';
import { globalWalletState } from '@stores/WalletStore';
import React, { useEffect } from 'react';

const useMinkeRewards = () => {
	const { address } = useState(globalWalletState()).value;
	const [points, setPoints] = React.useState(0);
	const [rewards, setRewards] = React.useState<Reward[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [updatedAt, setUpdatedAt] = React.useState<number>();

	const fetchRewards = async () => {
		setLoading(true);
		const apiRewards = await getRewards(address);
		setRewards(apiRewards);
		setPoints(apiRewards.filter(({ claimed }) => !claimed).length * POINTS_PER_REWARD);
		setUpdatedAt(new Date().getTime());
		setLoading(false);
	};

	useEffect(() => {
		fetchRewards();
	}, []);

	useFocusEffect(() => {
		if (!loading && updatedAt && new Date().getTime() - updatedAt > 20000) {
			fetchRewards();
		}
	});

	return {
		rewards,
		points,
		loading
	};
};

export default useMinkeRewards;
