import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '@hooks';

interface BoxProps {
	br?: number;
	mt?: number;
	mb?: number;
	w: number | string;
	h: number | string;
	style?: StyleProp<ViewStyle>;
}

const Box: React.FC<BoxProps> = ({ br = 0, mt = 0, mb = 0, w, h, style }) => {
	const { colors } = useTheme();

	return (
		<View
			style={{
				backgroundColor: colors.background3,
				height: h,
				width: w,
				borderRadius: br,
				marginTop: mt,
				marginBottom: mb,
				...(style as object)
			}}
		/>
	);
};

export default Box;
