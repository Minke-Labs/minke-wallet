import React from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const chooseTheme = (scheme: ColorSchemeName) => {
	if (scheme === 'dark') {
		return [
			'#2A4967',
			'#294865',
			'#25415C',
			'#25425E',
			'#274461',
			'#2A4967'
		];
	}
	return [
		'#F4F4F4',
		'rgba(244, 244, 244, 0.928027)',
		'rgba(237, 237, 237, 0.81)',
		'rgba(238, 238, 238, 0.897082)',
		'#F4F4F4'
	];
};

export const Gradient = () => {
	const scheme = useColorScheme();

	return (
		<LinearGradient
			start={{ x: 0, y: 1 }}
			end={{ x: 1, y: 1 }}
			colors={chooseTheme(scheme)}
			style={{
				height: '100%',
				width: 160
			}}
		/>
	);
};
