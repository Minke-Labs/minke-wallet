import React from 'react';
import { ActivityIndicator as PaperIndicator } from 'react-native-paper';
import { useTheme } from '@hooks';
import { ActivityIndicatorProps } from './ActivityIndicator.types';

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ size, style }) => {
	const { colors } = useTheme();
	return <PaperIndicator color={colors.text7} {...{ size, style }} />;
};

export default ActivityIndicator;
