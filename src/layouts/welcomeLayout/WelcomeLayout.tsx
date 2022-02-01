import React from 'react';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';
import styles from './WelcomeLayout.styles';

interface WelcomeLayoutProps {
	style?: any;
}

const WelcomeTemplate: React.FC<WelcomeLayoutProps> = ({ children, style }) => {
	const { colors } = useTheme();
	return (
		<SafeAreaView style={[style || styles.container, { backgroundColor: colors.background }]}>
			{children}
			<StatusBar />
		</SafeAreaView>
	);
};

export default WelcomeTemplate;
