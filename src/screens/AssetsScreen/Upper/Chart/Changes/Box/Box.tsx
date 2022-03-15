import React from 'react';
import { View } from 'react-native';
import { Text, PercChange } from '@components';
import { useTheme } from '@hooks';
import { makeStyles } from './Box.styles';
import { BoxProps } from './Box.types';

export const Box: React.FC<BoxProps> = ({ data, current, graphs, name }) => {
	const { colors } = useTheme();
	const percChange = data.value.percentChange > 0;
	const styles = makeStyles(colors, percChange);

	return (
		<View style={styles.container}>
			<Text type="span" marginBottom={8}>
				{name}
			</Text>
			<PercChange {...{ percChange, data, current, graphs }} />
		</View>
	);
};
