/* eslint-disable max-len */
import React from 'react';
import { useTheme } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';

const Arrow = () => {
	const { colors } = useTheme();
	return (
		<Svg width="8" height="16" viewBox="0 0 8 16" fill="none">
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.41007 8.95527C5.91019 8.46515 5.91019 7.65985 5.41007 7.16973L0.799841 2.65171C0.405392 2.26515 0.398997 1.63202 0.785557 1.23757C1.17212 0.843123 1.80525 0.836727 2.1997 1.22329L6.80992 5.74131C8.11023 7.01561 8.11023 9.10939 6.80992 10.3837L2.1997 14.9017C1.80525 15.2883 1.17212 15.2819 0.785556 14.8874C0.398996 14.493 0.405392 13.8598 0.79984 13.4733L5.41007 8.95527Z"
				fill={colors.primary}
			/>
		</Svg>
	);
};

export default Arrow;
