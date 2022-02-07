/* eslint-disable no-console */
/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { flag, FlagType } from '@styles';

export interface FlagProps {
	name: FlagType;
	size: number;
}

const Token: React.FC<Partial<FlagProps>> = ({ name = 'abkhazia', size = 96 }) => {
	const dArr = flag[name];
	const newDArr = dArr.reduce((acc, _, idx, arr) => {
		if (idx % 2 === 0) acc.push(arr.slice(idx, idx + 2));
		return acc;
	}, [] as any);
	return (
		<Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
			{newDArr.map((item: string) => (
				<Path key={item} d={item[0]} fill={item[1]} />
			))}
		</Svg>
	);
};

export default Token;
