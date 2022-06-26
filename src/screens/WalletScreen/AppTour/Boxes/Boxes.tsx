import React from 'react';
import { View } from 'react-native';
import { BoxesProps } from './Boxes.types';
import { getBox } from './Boxes.utils';

// TODO: Change to component's Paper after it comes from other branches after merging.
// Component's Paper has also change of light/dark themes embedded.
const Paper: React.FC = ({ children }) => (
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

export const Boxes: React.FC<BoxesProps> = ({ type }) => (
	<View style={{ position: 'absolute', ...(getBox(type).position) }}>
		<Paper>
			{getBox(type).component}
		</Paper>
	</View>
);
