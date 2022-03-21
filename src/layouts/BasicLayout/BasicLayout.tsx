import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@hooks';

import styles from './BasicLayout.styles';
import { BasicLayoutProps } from './BasicLayout.types';

const WelcomeTemplate: React.FC<BasicLayoutProps> = ({ children, center, style }) => {
	const { colors } = useTheme();
	return (
		<SafeAreaView
			style={[
				style || styles.container,
				{
					backgroundColor: colors.background1,
					...(center && { alignItems: 'center' })
				}
			]}
		>
			{children}
			<StatusBar />
		</SafeAreaView>
	);
};

export default WelcomeTemplate;
