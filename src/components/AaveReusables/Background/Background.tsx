import React from 'react';
import { View, Image } from 'react-native';
import AaveBg from './AaveBg.png';
import Ghost from './ghost.png';

const Background: React.FC<{ ghostTop: number }> = ({ children, ghostTop }) => (
	<View style={{ flex: 1 }}>
		<Image
			source={AaveBg}
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute'
			}}
		/>
		<Image
			source={Ghost}
			style={{
				position: 'absolute',
				right: 0,
				top: ghostTop
			}}
		/>
		{children}
	</View>
);

export default Background;
