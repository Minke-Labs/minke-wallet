import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme, useLanguage } from '@hooks';
import styles from './AboutCoin.styles';
import { AboutCoinProps } from './AboutCoin.types';

const AboutCoin: React.FC<AboutCoinProps> = ({ name, description }) => {
	const { i18n } = useLanguage();
	const { colors } = useTheme();
	if (!description) {
		return null;
	}

	return (
		<View style={[styles.container, { backgroundColor: colors.background2 }]}>
			<Text weight="extraBold" marginBottom={12}>
				{i18n.t('AssetsScreen.AboutCoin.about')} {name}
			</Text>
			<Text type="span">{description.replaceAll('<[^>]*>', '')}</Text>
		</View>
	);
};

export default AboutCoin;
