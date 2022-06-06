import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import { makeStyles } from './Rate.styles';

export const Rate: React.FC<{ count: number; }> = ({ count }) => {
	const { colors } = useTheme();
	const styles = makeStyles(colors);
	return (
		<View style={styles.container}>
			<View style={[styles.progressBar, { width: count * 1.42222222 }]} />
			<View style={styles.timer}>
				{count >= 0 && (
					<Text type="span" weight="bold">
						0:{count < 10 ? `0${count}` : count}
					</Text>
				)}
			</View>
		</View>
	);
};
