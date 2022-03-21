import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@hooks';

import styles from './BasicLayout.styles';
import { BasicLayoutProps } from './BasicLayout.types';

const BasicLayout: React.FC<BasicLayoutProps> = ({ children, center, style, bg = 'background1' }) => {
	const { colors } = useTheme();
	return (
		<SafeAreaView
			style={[
				style || styles.container,
				{
					backgroundColor: colors[bg],
					...(center && { alignItems: 'center' })
				}
			]}
		>
			{children}
			<StatusBar />
		</SafeAreaView>
	);
};

export default BasicLayout;
