/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { flag, FlagType } from '@styles';
import { Image } from 'react-native';
import { whale3Img } from '@images';

export interface FlagProps {
	name: FlagType;
	size: number;
}

const Flag: React.FC<Partial<FlagProps>> = ({ name = '', size = 96 }) => {
	const dArr = flag[name];

	if (!dArr) {
		return (
			<Image
				source={whale3Img}
				style={{
					width: size,
					height: size,
					borderRadius: size / 2
				}}
			/>
		);
	}
	const newDArr = dArr.reduce((acc, _, idx, arr) => {
		if (idx % 2 === 0) acc.push(arr.slice(idx, idx + 2));
		return acc;
	}, [] as any);
	return (
		<Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
			{newDArr.map((item: string, idx: number) => (
				<Path key={`${item}-${idx}`} d={item[0]} fill={item[1]} />
			))}
		</Svg>
	);
};

export default Flag;
