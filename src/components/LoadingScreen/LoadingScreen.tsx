import React from 'react';
import { View, Image, Modal } from 'react-native';
import { useTheme, useLanguage } from '@hooks';
import Text from '../Text/Text';
import styles from './LoadingScreen.styles';
import { LoadingScreenProps } from './LoadingScreen.types';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ title }) => {
	const { colors } = useTheme();
	const { i18n } = useLanguage();
	return (
		<Modal visible>
			<View style={[styles.container, { backgroundColor: colors.background1 }]}>
				<Image style={styles.image} source={require('../../../assets/wave.gif')} />
				<View>
					<Text type="h2" weight="bold" marginBottom={8} center>
						{title}
					</Text>
					<Text type="p2" center>
						{i18n.t('LoadingScreen.this_can_take_a_few_seconds')}
					</Text>
				</View>
			</View>
		</Modal>
	);
};

export default LoadingScreen;
