import { Dispatch, SetStateAction } from 'react';

export interface TabProps {
	active?: boolean;
	side: string;
	onTabSelect: Dispatch<SetStateAction<string>>;
}
