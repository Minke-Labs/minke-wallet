import React from 'react';
import { View } from 'react-native';
import { token } from '@styles';
import { Svg, Path } from 'react-native-svg';
import { TokenProps } from './Token.types';

const Token: React.FC<Partial<TokenProps>> = ({ name = 'aave', size = 96, outline }) => {
	const tokenColor = token[name][0];
	const dArr = token[name].slice(1);
	return (
		<View style={{ alignItems: 'center', justifyContent: 'center', width: size + 6 }}>
			<View
				style={{
					width: size + 6,
					height: size + 6,
					borderRadius: (size + 6) / 2,
					borderWidth: 1,
					borderColor: tokenColor,
					display: outline ? 'flex' : 'none'
				}}
			/>
			<Svg style={{ position: 'absolute' }} width={size} height={size} viewBox="0 0 32 32" fill="none">
				{dArr.map((d, idx) => (
					<Path key={d} d={d} fill={idx === 0 ? tokenColor : 'white'} />
				))}
			</Svg>
		</View>
	);
};

export default Token;
