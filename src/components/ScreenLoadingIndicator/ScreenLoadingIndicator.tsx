import { useTheme } from '@src/hooks';
import React from 'react';
import { View } from 'react-native';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';

const ScreenLoadingIndicator = () => {
	const { colors } = useTheme();
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				flexDirection: 'row',
				padding: 10,
				backgroundColor: colors.background1
			}}
		>
			<ActivityIndicator size="large" />
		</View>
	);
};

export default ScreenLoadingIndicator;
