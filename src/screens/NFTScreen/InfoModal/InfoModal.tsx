/* eslint-disable max-len */
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
				<Text type="hSmall" weight="bold">
					{i18n.t('NFTScreen.InfoModal.floor_price')}
				</Text>
				<TouchableOpacity onPress={onPress}>
					<Icon name="closeStroke" size={24} color="cta1" />
				</TouchableOpacity>
			</View>

			<Text type="bMedium" marginBottom={32}>
				{i18n.t('NFTScreen.InfoModal.estimated_value')}
			</Text>
			<Text type="bMedium" marginBottom={32}>
				{i18n.t('NFTScreen.InfoModal.term')}
			</Text>
		</View>
	);
};
