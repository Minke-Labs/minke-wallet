import { Dispatch, SetStateAction } from 'react';

export interface TabSelectorProps {
	setSelectedTab: Dispatch<SetStateAction<string>>;
	selectedTab: string;
	leftTitle: string;
	rightTitle: string;
}
