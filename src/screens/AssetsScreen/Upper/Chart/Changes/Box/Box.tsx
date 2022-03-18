import React from 'react';
import { View } from 'react-native';
import { Text, PercChange } from '@components';
import { useTheme } from '@hooks';
import { ColorType } from '@styles';
import { makeStyles } from './Box.styles';
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

	const styles = makeStyles(colors, percChange, chooseColor(data.value.percentChange, colors));

	return (
		<View style={styles.container}>
			<Text type="span" marginBottom={8}>
				{name}
			</Text>
			<PercChange {...{ percZero, percChange, data, current, graphs }} />
		</View>
	);
};
