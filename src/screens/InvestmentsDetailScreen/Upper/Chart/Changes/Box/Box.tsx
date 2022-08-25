import React from 'react';
import { View, Text, PercChange } from '@components';
import { useTheme } from '@hooks';
import { ColorType } from '@styles';
import { addColorOpacity } from '@helpers/utilities';
import { BoxProps } from './Box.types';

export const Box: React.FC<BoxProps> = ({ data, current, graphs, name }) => {
	const { colors } = useTheme();
	const percChange = data.value.percentChange > 0;
	const percZero = data.value.percentChange === 0;

	const chooseColor = (pChange: number, c: ColorType) => {
		if (pChange > 0) return c.alert3;
		if (pChange < 0) return c.alert1;
		return c.text4;
	};

	return (
		<View
			p="xs"
			br="xs"
			mr="xxs"
			style={{ backgroundColor: addColorOpacity(chooseColor(data.value.percentChange, colors), 0.1) }}
		>
			<Text type="lSmall">
				{name}
			</Text>
			<PercChange {...{ percZero, percChange, data, current, graphs }} />
		</View>
	);
};
