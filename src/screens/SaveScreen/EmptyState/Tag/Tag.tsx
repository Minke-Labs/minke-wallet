import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from '@components';
import { useLanguage } from '@hooks';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './Tag.styles';

export const Tag: React.FC<{ apy: string; }> = ({ apy }) => {
	const { i18n } = useLanguage();
	return (
		<View style={styles.tagGradient}>
			<LinearGradient
				start={{ x: 0, y: 0.75 }}
				end={{ x: 1, y: 0.25 }}
				colors={['#30C061', '#30C08C']}
				style={styles.tagLinearGradient}
			>
				<Icon name="iconUp" color="text11" size={16} style={styles.tagIcon} />
				<Text weight="bold" type="a" color="text11" style={{ lineHeight: 25 }}>
					{apy}
					{i18n.t('SaveScreen.interest')}
				</Text>
			</LinearGradient>
		</View>
	);
};
