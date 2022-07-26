/* eslint-disable max-len */
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from '@components';
import styles from './InfoModal.styles';
import { InfoModalProps } from './InfoModal.types';

export const InfoModal: React.FC<InfoModalProps> = ({ onPress }) => (
	<View style={styles.container}>
		<View style={styles.header}>
			<Text type="hSmall" weight="bold">What is floor price?</Text>
			<TouchableOpacity onPress={onPress}>
				<Icon name="closeStroke" size={24} color="cta1" />
			</TouchableOpacity>
		</View>

		<Text type="bMedium" marginBottom={32}>
			• The estimated value of your collection is based on the floor price of each NFT.
		</Text>
		<Text type="bMedium" marginBottom={32}>
			• The floor price is a term given to represent the current lowest price for which one can own an NFT in a certain collection or project.
		</Text>
	</View>
);
