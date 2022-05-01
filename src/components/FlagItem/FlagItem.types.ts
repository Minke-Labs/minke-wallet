import { FlagType } from '@styles';

export interface FlagItemProps {
	flag: FlagType;
	title: string;
	active: boolean;
	onPress: () => void;
}
