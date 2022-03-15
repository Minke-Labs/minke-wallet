import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import styles from './AboutCoin.styles';
import { AboutCoinProps } from './AboutCoin.types';

const AboutCoin: React.FC<AboutCoinProps> = ({
	name,
	data: {
		description: { en }
	}
}) => {
	const { colors } = useTheme();
	if (!en) {
		return null;
	}
	return (
		<View style={[styles.container, { backgroundColor: colors.background2 }]}>
			<Text weight="extraBold" marginBottom={12}>
				About {name}
			</Text>
			<Text type="span">{en}</Text>
		</View>
	);
};

export default AboutCoin;
