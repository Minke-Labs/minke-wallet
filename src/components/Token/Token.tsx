import React from 'react';
import { token } from '@styles';
import { Svg, Path } from 'react-native-svg';
import { TokenProps } from './Token.types';

const Token: React.FC<Partial<TokenProps>> = ({ name = 'aave', size = 96 }) => {
	const tokenColor = token[name][0];
	const dArr = token[name].slice(1);
	return (
		<Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
			{dArr.map((d, idx) => (
				<Path key={d} d={d} fill={idx === 0 ? tokenColor : 'white'} />
			))}
		</Svg>
	);
};

export default Token;
