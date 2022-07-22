import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export const Gradient = () => (
	<LinearGradient
		start={{ x: 0, y: 1 }}
		end={{ x: 1, y: 1 }}
		colors={[
			'#F4F4F4',
			'rgba(244, 244, 244, 0.928027)',
			'rgba(237, 237, 237, 0.81)',
			'rgba(238, 238, 238, 0.897082)',
			'#F4F4F4'
		]}
		style={{
			height: '100%',
			width: 160
		}}
	/>
);
