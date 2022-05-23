/* eslint-disable max-len */
import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '@hooks';

const BorderSVG = () => {
	const { colors } = useTheme();
	return (
		<Svg
			width="100%"
			height={374}
			fill="none"
		>
			<Path
				d="M-72 53.524c0-12.458 9.531-22.844 21.943-23.912L279.957 1.22C331.344-3.201 375.5 37.319 375.5 88.896V431H-72V53.524Z"
				fill={colors.text6}
				// fill="red"
			/>
		</Svg>
	);
};

export default BorderSVG;
