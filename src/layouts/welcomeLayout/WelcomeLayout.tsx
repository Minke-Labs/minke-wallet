import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';
import styles from './WelcomeLayout.styles';

interface WelcomeLayoutProps {
	style?: any;
	center?: boolean;
}

const WelcomeTemplate: React.FC<WelcomeLayoutProps> = ({ children, center, style }) => {
	const { colors } = useTheme();
	return (
		<SafeAreaView
			style={[
				style || styles.container,
				{
					backgroundColor: colors.background,
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
