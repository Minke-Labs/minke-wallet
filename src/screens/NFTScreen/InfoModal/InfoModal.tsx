import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@components';
import { useLanguage } from '@hooks';
import styles from './InfoModal.styles';
import { InfoModalProps } from './InfoModal.types';

export const InfoModal: React.FC<InfoModalProps> = ({ onPress }) => {
	const { i18n } = useLanguage();
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text type="tMedium" weight="bold">
					{i18n.t('NFTScreen.InfoModal.how_are_valued')}
				</Text>
				<TouchableOpacity onPress={onPress}>
					<Icon name="close" size={24} color="cta1" />
				</TouchableOpacity>
			</View>

			<Text type="bSmall" mb="m" color="text2" width={343}>
				{i18n.t('NFTScreen.InfoModal.desc')}
			</Text>
		</View>
	);
};
