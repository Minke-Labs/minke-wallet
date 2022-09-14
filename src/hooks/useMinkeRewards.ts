import { useState, useEffect } from 'react';
import useGlobalWalletState from '@src/hooks/useGlobalWalletState';
import { useFocusEffect } from '@react-navigation/native';
import { getRewards } from '@src/services/apis/minke/minke';
import { Reward } from '@src/services/apis/minke/minke.types';

const useMinkeRewards = () => {
	const { address } = useGlobalWalletState();
	const [points, setPoints] = useState(0);
	const [rewards, setRewards] = useState<Reward[]>([]);
	const [loading, setLoading] = useState(true);
	const [updatedAt, setUpdatedAt] = useState<number>();

	const fetchRewards = async () => {
		setLoading(true);
		const apiRewards = await getRewards(address);
		setRewards(apiRewards);
		const availablePoints = apiRewards
			.filter(({ claimed }) => !claimed)
			.map(({ points: rewardPoints }) => rewardPoints);
		setPoints(availablePoints.reduce((partialSum, a) => partialSum + a, 0));
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
