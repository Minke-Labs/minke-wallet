import { View, Dimensions } from 'react-native';
import React from 'react';

const ModalPaper: React.FC = ({ children }) => (
	<View style={{
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 5,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		height: Dimensions.get('screen').height * 0.9,
		width: Dimensions.get('screen').width * 0.95,
		overflow: 'hidden'
	}}
	>
		{children}
	</View>
);

export default ModalPaper;
