import { useDerivedValue } from 'react-native-reanimated';

export const useChanges = (graphs: any) => {
	const hour = useDerivedValue(() => graphs[0].data);
	const day = useDerivedValue(() => graphs[1].data);
	const week = useDerivedValue(() => graphs[2].data);
	const month = useDerivedValue(() => graphs[3].data);
	const year = useDerivedValue(() => graphs[4].data);
	const all = useDerivedValue(() => graphs[5].data);

	return { hour, day, week, month, year, all };
};
