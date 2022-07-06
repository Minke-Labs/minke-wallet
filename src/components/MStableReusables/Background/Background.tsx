import React from 'react';
import { View, Image } from 'react-native';
import MStableBg from './mStableBg.png';
import Coin from './Coin.png';

const Background: React.FC<{ coinTop: number }> = ({ children, coinTop }) => (
	<View style={{ flex: 1 }}>
		<Image
			source={MStableBg}
			style={{
				width: '100%',
				height: '100%',
				position: 'absolute'
			}}
		/>
		<Image
			source={Coin}
			style={{
				position: 'absolute',
				right: 0,
				top: coinTop
			}}
		/>
		{children}
	</View>
);

export default Background;
