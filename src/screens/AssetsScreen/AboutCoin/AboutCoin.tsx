import React from 'react';
import { View } from 'react-native';
import { Text } from '@components';
import { useTheme } from '@hooks';
import i18n from '@localization';
import styles from './AboutCoin.styles';
import { AboutCoinProps } from './AboutCoin.types';

const AboutCoin: React.FC<AboutCoinProps> = ({ name, description }) => {
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
