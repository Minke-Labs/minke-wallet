import React from 'react';

export interface TabLayoutProps {
	left: React.ReactChild;
	right: React.ReactChild;
	leftTitle: string;
	rightTitle: string;
	onRefresh: () => void;
	loading: boolean;
}
