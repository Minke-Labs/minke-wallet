import React from 'react';
import { View } from 'react-native';

// TODO: Change to component's Paper after it comes from other branches after merging.
// Component's Paper has also change of light/dark themes embedded.
export const Paper: React.FC = ({ children }) => (
	<View
		style={{
			paddingHorizontal: 16,
			paddingVertical: 24,
			backgroundColor: 'white',
			borderRadius: 8
		}}
	>
		{children}
	</View>
);
