import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { ColorType } from '@styles';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@hooks';
import styles from './BasicLayout.styles';
import { BasicLayoutProps } from './BasicLayout.types';

interface BaseProps {
	bg?: keyof ColorType;
}

const Base: React.FC<BaseProps> = ({ children, bg }) => {
	const { colors } = useTheme();
	return (
		<View style={{ flex: 1, backgroundColor: colors[bg!] }}>
			{children}
			<StatusBar />
		</View>
	);
};

const BasicLayout: React.FC<BasicLayoutProps> = ({
	children,
	center,
	style,
	bg = 'background1',
	hideSafeAreaView = false
}) => {
	const { colors } = useTheme();

	if (hideSafeAreaView) {
		return (
			<View style={[style || styles.container, { ...(center && { alignItems: 'center' }) }]}>
				<Base bg={bg as keyof ColorType}>{children}</Base>
			</View>
		);
	}

	return (
		<View style={{ flex: 1, backgroundColor: colors[bg!] }}>
			<SafeAreaView style={[style || styles.container, { ...(center && { alignItems: 'center' }) }]}>
				<Base bg={bg as keyof ColorType}>{children}</Base>
			</SafeAreaView>
		</View>
	);
};

export default BasicLayout;
