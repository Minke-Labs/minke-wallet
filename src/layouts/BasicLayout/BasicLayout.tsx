import React, { useEffect } from 'react';
import { SafeAreaView, View, StatusBar as RNStatusBar } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ColorType } from '@styles';
import { StatusBar } from 'expo-status-bar';
import { useAmplitude, useTheme } from '@hooks';
import styles from './BasicLayout.styles';
import { BasicLayoutProps } from './BasicLayout.types';

interface BaseProps {
	bgc?: keyof ColorType;
	center?: boolean;
}

const Base: React.FC<BaseProps> = ({ children, bgc, center }) => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: colors[bgc!],
				paddingTop: RNStatusBar.currentHeight,
				...(center && { alignItems: 'center' })
			}}
		>
			{children}
			<StatusBar />
		</View>
	);
};

const BasicLayout: React.FC<BasicLayoutProps> = ({
	children,
	center,
	style,
	bgc = 'background1',
	hideSafeAreaView = false
}) => {
	const { name } = useRoute();
	const { track } = useAmplitude();
	const { colors } = useTheme();

	useEffect(() => {
		track(`${name} Opened`);
	}, [name]);

	if (hideSafeAreaView) {
		return (
			<View style={style ?? styles.container}>
				<Base bgc={bgc as keyof ColorType} center={center}>
					{children}
				</Base>
			</View>
		);
	}

	return (
		<View style={{ flex: 1, backgroundColor: colors[bgc! as keyof ColorType] }}>
			<SafeAreaView style={[style || styles.container]}>
				<Base bgc={bgc as keyof ColorType} center={center}>
					{children}
				</Base>
			</SafeAreaView>
		</View>
	);
};

export default BasicLayout;
