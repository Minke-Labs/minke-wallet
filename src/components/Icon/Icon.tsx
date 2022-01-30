import React from 'react';
import { icon } from '@styles';
import { useTheme } from 'react-native-paper';
import { Svg, Path, Circle } from 'react-native-svg';
import { IconProps } from './Icon.types';

const Icon: React.FC<Partial<IconProps>> = ({ name = 'gear', color = 'text' }) => {
	const { colors } = useTheme();
	const chosenColor = colors[color];

	return (
		<Svg>
			{name === 'networkStroke' && (
				<>
					<Circle cx="76.5" cy="64.5" r="10.5" fill={chosenColor} />
					<Circle cx="18.5" cy="64.5" r="10.5" fill={chosenColor} />
					<Circle cx="47.5" cy="16.5" r="10.5" fill={chosenColor} />
				</>
			)}
			{icon[name].map((d) => (
				<Path key={d} fillRule="evenodd" clipRule="evenodd" d={d} fill={chosenColor} />
			))}
			{name === 'avatarColor' && <Circle cx="48" cy="33" r="20" stroke={colors.text} strokeWidth="8" />}
		</Svg>
	);
};

export default Icon;
