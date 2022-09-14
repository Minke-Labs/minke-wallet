import { SpacingType } from '@styles';
import React from 'react';

export interface CardProps {
	title: string;
	subtitle: string;
	image: React.ReactChild;
	right?: React.ReactChild;
	onPress?: () => void;
	mb?: SpacingType;
	thirdRowText?: string | number;
}
