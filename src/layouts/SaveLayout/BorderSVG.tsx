/* eslint-disable max-len */
import React from 'react';
import { Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '@hooks';

const BorderSVG = () => {
	const { colors } = useTheme();
	return (
		<Svg
			width={Dimensions.get('window').width}
			height={373}
			fill="none"
			viewBox="0 0 361 373"
		>
			<Path
				d="M-72 52.524c0-12.458 9.531-22.844 21.943-23.912L279.957.22C331.344-4.201 375.5 36.319 375.5 87.896V430H-72V52.524Z"
				fill={colors.background5}
			/>
		</Svg>
	);
};

export default BorderSVG;
