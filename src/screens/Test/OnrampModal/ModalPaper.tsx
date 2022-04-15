import { View } from 'react-native';
import React from 'react';

export const ModalPaper: React.FC = ({ children }) => (
	<View style={{
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4
	}}
	>
		{children}
	</View>
);
