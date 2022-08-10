import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '@hooks';
import { styles } from './Bottom.styles';

export const Bottom: React.FC = ({ children }) => {
	const { colors } = useTheme();
	return (
		<ScrollView style={[styles.container, { backgroundColor: colors.background1 }]}>
			{children}
		</ScrollView>
	);
};
