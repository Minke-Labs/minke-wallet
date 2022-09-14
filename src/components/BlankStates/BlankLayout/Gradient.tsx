import React from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const chooseTheme = (scheme: ColorSchemeName) => {
	if (scheme === 'dark') {
		return [
			'#2A4967',
			'#2A4967',
			'#25415C',
			'#2A4967',
			'#2A4967'
		];
	}
	return [
		'rgba(255, 255, 255, 0)',
		'rgba(254, 253, 252, 0)',
		'rgba(235, 229, 221, 0.3)',
		'rgba(254, 253, 252, 0)',
		'rgba(255, 255, 255, 0)'
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
