import { View } from 'react-native';
import React from 'react';

export const ModalBackground: React.FC = ({ children }) => (
	<View style={{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	}}
	>
		{children}
	</View>
);
