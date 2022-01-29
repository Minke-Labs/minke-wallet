import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'react-native-paper';
import styles from './WelcomeTemplate.styles';

interface WelcomeTemplateProps {
	style?: any;
}

const WelcomeTemplate: React.FC<WelcomeTemplateProps> = ({ children, style }) => {
	const { colors } = useTheme();
	return (
		<View style={[style || styles.container, { backgroundColor: colors.background }]}>
			{children}
			<StatusBar />
		</View>
	);
};

export default WelcomeTemplate;
