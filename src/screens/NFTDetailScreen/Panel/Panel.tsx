import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@hooks';
import { Text } from '@components';
import { PanelProps } from './Panel.types';
import { styles } from './Panel.styles';

export const Panel: React.FC<PanelProps> = ({ floor, lastSale }) => {
	const { colors } = useTheme();
	return (
		<View style={[styles.container, { backgroundColor: colors.background5 }]}>
			<View style={[styles.left, { borderRightColor: colors.background1 }]}>
				<Text type="bMedium">Floor price</Text>
				<Text type="hSmall" weight="bold">{floor}</Text>
			</View>
			<View style={styles.right}>
				<Text type="bMedium">Last sale price</Text>
				<Text type="hSmall" weight="bold">{lastSale}</Text>
			</View>
		</View>
	);
};
